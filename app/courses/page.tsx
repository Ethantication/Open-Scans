'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { INITIAL_COURSES } from '@/lib/courses'
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export default function CoursesPage() {
  const searchParams = useSearchParams()
  const dept = searchParams.get('dept')
  const [courseScanCounts, setCourseScanCounts] = useState<{ [key: string]: number }>({})
  
  // Fetch scan counts
  useEffect(() => {
    async function fetchCounts() {
      const { data: courses } = await supabase
        .from('courses')
        .select('id, course_number')
      
      if (courses) {
        const counts: { [key: string]: number } = {}
        
        for (const course of courses) {
          const { count } = await supabase
            .from('scans')
            .select('*', { count: 'exact', head: true })
            .eq('course_id', course.id)
          
          counts[course.course_number] = count || 0
        }
        
        setCourseScanCounts(counts)
      }
    }
    
    fetchCounts()
  }, [])
  
  const filteredCourses = dept 
    ? INITIAL_COURSES.filter(c => c.department === dept)
    : INITIAL_COURSES

  return (
    <html lang="he" dir="rtl">
      <head>
        <title>{dept ? `קורסים ב${dept}` : 'כל הקורסים'} - Open Scans</title>
      </head>
      <body className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity w-fit">
              <div className="w-12 h-12 relative">
                <img src="/logo.svg" alt="Open Scans" className="w-full h-full" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Open Scans
                </h1>
              </div>
            </Link>
          </div>
        </header>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-4"
            >
              ← חזרה לדף הבית
            </Link>
            
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              {dept ? (
                <>
                  {dept === 'מדעי המחשב' && '💻'} 
                  {dept === 'מתמטיקה' && '📐'}
                  {dept === 'כלכלה וניהול' && '💰'}
                  {dept === 'מדעי החברה' && '📚'}
                  {' '}
                  כל הקורסים ב{dept}
                </>
              ) : (
                '📚 כל הקורסים'
              )}
            </h2>
            <p className="text-gray-600">
              נמצאו {filteredCourses.length} קורסים
            </p>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCourses.map(course => (
              <Link
                key={course.code}
                href={`/courses/${course.code}`}
                className="group p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all hover:scale-105"
              >
                <div className="font-mono text-sm text-blue-600 font-bold mb-2">
                  {course.code}
                </div>
                <div className="text-gray-800 font-medium group-hover:text-blue-600 transition-colors leading-snug mb-3">
                  {course.name}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {course.department}
                  </span>
                  <span className="text-sm font-medium text-gray-600">
                    {courseScanCounts[course.code] || 0} סריקות
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                לא נמצאו קורסים
              </h3>
              <p className="text-gray-600">
                נסה לחפש משהו אחר או חזור לדף הבית
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <p className="text-gray-400">© 2026 Open Scans. נוצר עם ❤️ על ידי סטודנטים</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
