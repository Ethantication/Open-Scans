import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    // Extract form data
    const file = formData.get('file') as File
    const courseCode = formData.get('courseCode') as string
    const newCourseName = formData.get('newCourseName') as string
    const newCourseDepartment = formData.get('newCourseDepartment') as string
    const year = formData.get('year') as string
    const semester = formData.get('semester') as string
    const examType = formData.get('examType') as string
    const grade = formData.get('grade') as string
    const uploaderName = formData.get('uploaderName') as string
    const notes = formData.get('notes') as string

    // Validation
    if (!file) {
      return NextResponse.json({ error: 'חסר קובץ PDF' }, { status: 400 })
    }

    if (!courseCode) {
      return NextResponse.json({ error: 'חסר מספר קורס' }, { status: 400 })
    }

    if (!semester || !examType || !uploaderName) {
      return NextResponse.json({ error: 'חסרים שדות חובה' }, { status: 400 })
    }

    // Validate file type
    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'רק קבצי PDF מותרים' }, { status: 400 })
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'הקובץ גדול מדי (מקסימום 10MB)' }, { status: 400 })
    }

    // Step 1: Check if course exists, if not create it
    let courseId = ''
    
    const { data: existingCourse } = await supabase
      .from('courses')
      .select('id')
      .eq('course_number', courseCode)
      .single()

    if (existingCourse) {
      courseId = existingCourse.id
    } else {
      // Create new course
      if (!newCourseName || !newCourseDepartment) {
        return NextResponse.json({ 
          error: 'קורס חדש דורש שם ומחלקה' 
        }, { status: 400 })
      }

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
          error: 'שגיאה ביצירת קורס חדש' 
        }, { status: 500 })
      }

      courseId = newCourse.id
    }

    // Step 2: Upload file to Supabase Storage
    const fileExt = 'pdf'
    const timestamp = Date.now()
    const randomStr = Math.random().toString(36).substring(7)
    const fileName = `${courseCode}_${year}_${semester}_${examType}_${timestamp}_${randomStr}.${fileExt}`
    
    const fileBuffer = await file.arrayBuffer()
    const fileData = new Uint8Array(fileBuffer)

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('scans')
      .upload(fileName, fileData, {
        contentType: 'application/pdf',
        cacheControl: '3600',
      })

    if (uploadError) {
      console.error('Error uploading file:', uploadError)
      return NextResponse.json({ 
        error: 'שגיאה בהעלאת הקובץ' 
      }, { status: 500 })
    }

    // Step 3: Insert scan metadata to database
    const { data: scanData, error: scanError } = await supabase
      .from('scans')
      .insert({
        course_id: courseId,
        file_path: uploadData.path,
        year: parseInt(year),
        semester: semester,
        exam_type: examType,
        grade: grade ? parseInt(grade) : null,
        uploader_name: uploaderName,
        notes: notes || null,
      })
      .select()
      .single()

    if (scanError) {
      console.error('Error inserting scan:', scanError)
      
      // Cleanup: delete uploaded file
      await supabase.storage.from('scans').remove([fileName])
      
      return NextResponse.json({ 
        error: 'שגיאה בשמירת נתוני הסריקה' 
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      courseCode: courseCode,
      scanId: scanData.id
    })

  } catch (error: any) {
    console.error('Upload error:', error)
    return NextResponse.json({ 
      error: error.message || 'שגיאה כללית בהעלאה' 
    }, { status: 500 })
  }
}
