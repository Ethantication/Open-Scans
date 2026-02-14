import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    // Extract form data
    const file = formData.get('file') as File | null
    const courseCode = formData.get('courseCode') as string
    const newCourseName = formData.get('newCourseName') as string
    const newCourseDepartment = formData.get('newCourseDepartment') as string
    const year = formData.get('year') as string
    const semester = formData.get('semester') as string
    const examType = formData.get('examType') as string
    const grade = formData.get('grade') as string
    const uploaderName = formData.get('uploaderName') as string
    const notes = formData.get('notes') as string

    console.log('Received upload request:', {
      hasFile: !!file,
      fileName: file?.name,
      fileSize: file?.size,
      fileType: file?.type,
      courseCode,
      uploaderName,
    })

    // Validation
    if (!file) {
      console.error('No file provided')
      return NextResponse.json({ error: 'חסר קובץ PDF' }, { status: 400 })
    }

    if (!courseCode) {
      console.error('No course code provided')
      return NextResponse.json({ error: 'חסר מספר קורס' }, { status: 400 })
    }

    if (!semester || !examType || !uploaderName) {
      console.error('Missing required fields')
      return NextResponse.json({ error: 'חסרים שדות חובה' }, { status: 400 })
    }

    // Validate file type
    if (file.type !== 'application/pdf') {
      console.error('Invalid file type:', file.type)
      return NextResponse.json({ error: 'רק קבצי PDF מותרים' }, { status: 400 })
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      console.error('File too large:', file.size)
      return NextResponse.json({ error: 'הקובץ גדול מדי (מקסימום 10MB)' }, { status: 400 })
    }

    // Step 1: Check if course exists, if not create it
    let courseId = ''
    
    console.log('Checking if course exists:', courseCode)
    const { data: existingCourse, error: fetchError } = await supabase
      .from('courses')
      .select('id')
      .eq('course_number', courseCode)
      .maybeSingle()

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error fetching course:', fetchError)
      return NextResponse.json({ 
        error: 'שגיאה בבדיקת קורס: ' + fetchError.message 
      }, { status: 500 })
    }

    if (existingCourse) {
      courseId = existingCourse.id
      console.log('Course exists:', courseId)
    } else {
      // Create new course
      if (!newCourseName || !newCourseDepartment) {
        console.error('New course needs name and department')
        return NextResponse.json({ 
          error: 'קורס חדש דורש שם ומחלקה' 
        }, { status: 400 })
      }

      console.log('Creating new course:', { courseCode, newCourseName, newCourseDepartment })
      const { data: newCourse, error: courseError } = await supabase
        .from('courses')
        .insert({
          course_number: courseCode,
          course_name: newCourseName,
          department: newCourseDepartment
        })
        .select()
        .single()

      if (courseError) {
        console.error('Error creating course:', courseError)
        return NextResponse.json({ 
          error: 'שגיאה ביצירת קורס חדש: ' + courseError.message 
        }, { status: 500 })
      }

      courseId = newCourse.id
      console.log('Created new course:', courseId)
    }

    // Step 2: Upload file to Supabase Storage
    const fileExt = 'pdf'
    const timestamp = Date.now()
    const randomStr = Math.random().toString(36).substring(7)
    
    // Map Hebrew to English to avoid Storage errors
    const semesterMap: { [key: string]: string } = {
      'א': 'a',
      'ב': 'b',
      'קיץ': 'summer'
    }
    
    const examTypeMap: { [key: string]: string } = {
      'מועד א': 'moed-a',
      'מועד ב': 'moed-b',
      'מועד ג': 'moed-c',
      'בוחן': 'quiz'
    }
    
    const semesterEn = semesterMap[semester] || semester
    const examTypeEn = examTypeMap[examType] || examType.replace(/\s+/g, '-')
    
    const fileName = `${courseCode}_${year}_${semesterEn}_${examTypeEn}_${timestamp}_${randomStr}.${fileExt}`
    
    console.log('Uploading file:', fileName)
    
    // Convert file to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer()
    const uint8Array = new Uint8Array(arrayBuffer)

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('scans')
      .upload(fileName, uint8Array, {
        contentType: 'application/pdf',
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) {
      console.error('Error uploading file:', uploadError)
      return NextResponse.json({ 
        error: 'שגיאה בהעלאת הקובץ: ' + uploadError.message 
      }, { status: 500 })
    }

    console.log('File uploaded successfully:', uploadData.path)

    // Step 3: Insert scan metadata to database
    console.log('Inserting scan metadata')
    const { data: scanData, error: scanError } = await supabase
      .from('scans')
      .insert({
        course_id: courseId,
        user_id: null, // No auth - set to null
        file_path: uploadData.path,
        year: parseInt(year),
        semester: semester,
        exam_type: examType,
        grade: grade ? parseInt(grade) : null,
        uploader_name: uploaderName,
        notes: notes || null,
        views: 0,
        downloads: 0,
      })
      .select()
      .single()

    if (scanError) {
      console.error('Error inserting scan:', scanError)
      
      // Cleanup: delete uploaded file
      console.log('Cleaning up uploaded file')
      await supabase.storage.from('scans').remove([uploadData.path])
      
      return NextResponse.json({ 
        error: 'שגיאה בשמירת נתוני הסריקה: ' + scanError.message 
      }, { status: 500 })
    }

    console.log('Scan uploaded successfully:', scanData.id)

    return NextResponse.json({
      success: true,
      courseCode: courseCode,
      scanId: scanData.id
    })

  } catch (error: any) {
    console.error('Upload error:', error)
    return NextResponse.json({ 
      error: 'שגיאה כללית: ' + (error.message || 'לא ידועה') 
    }, { status: 500 })
  }
}

