'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link';
import { INITIAL_COURSES } from '@/lib/courses';
import { createClient } from '@supabase/supabase-js';
import './globals.css';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [totalScans, setTotalScans] = useState(0)
  const [courseScanCounts, setCourseScanCounts] = useState<{ [key: string]: number }>({})
  
  const courseCount = INITIAL_COURSES.length;
  const departments = Array.from(new Set(INITIAL_COURSES.map(c => c.department)));
  
  // Fetch total scans count
  useEffect(() => {
    async function fetchStats() {
      // Get total scans
      const { count } = await supabase
        .from('scans')
        .select('*', { count: 'exact', head: true })
      
      setTotalScans(count || 0)
      
      // Get scan count per course
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
    
    fetchStats()
  }, [])
  
  // Filter courses based on search
  const filteredCourses = INITIAL_COURSES.filter(course => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      course.code.toLowerCase().includes(query) ||
      course.name.toLowerCase().includes(query) ||
      course.department.toLowerCase().includes(query)
    )
  })
  
  // Group filtered courses by department
  const popularByDept = departments.map(dept => ({
    dept,
    courses: filteredCourses.filter(c => c.department === dept).slice(0, searchQuery ? 100 : 3)
  })).filter(group => group.courses.length > 0)

  return (
    <html lang="he" dir="rtl">
      <head>
        <title>Open Scans - מאגר סריקות מבחנים לאוניברסיטה הפתוחה</title>
        <meta name="description" content="מאגר סריקות מבחנים של האוניברסיטה הפתוחה - גישה חופשית לסריקות מבחנים לכל הקורסים" />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 relative">
                  <img src="/logo.svg" alt="Open Scans" className="w-full h-full" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Open Scans
                  </h1>
                  <p className="text-sm text-gray-600">מאגר הסריקות של האוניברסיטה הפתוחה</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Link 
                  href="/upload"
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg transition-all hover:scale-105"
                >
                  ➕ העלה סריקה
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              כל הסריקות שאתם צריכים 📚
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              מאגר סריקות מבחנים חינמי ופתוח לכל סטודנטי האוניברסיטה הפתוחה
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="relative">
              <input
                type="text"
                placeholder="🔍 חפש קורס לפי שם או מספר..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-5 text-lg border-2 border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="mt-3 text-gray-600 text-center">
                נמצאו {filteredCourses.length} קורסים
              </p>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white rounded-2xl shadow-md p-8 text-center border-2 border-gray-100 hover:shadow-xl transition-all hover:scale-105">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                {courseCount}
              </div>
              <div className="text-gray-600 text-lg">קורסים זמינים</div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-md p-8 text-center border-2 border-gray-100 hover:shadow-xl transition-all hover:scale-105">
              <div className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                {totalScans}
              </div>
              <div className="text-gray-600 text-lg">סריקות במאגר</div>
              {totalScans === 0 && (
                <div className="text-sm text-gray-500 mt-1">היו הראשונים להעלות!</div>
              )}
            </div>
            
            <div className="bg-white rounded-2xl shadow-md p-8 text-center border-2 border-gray-100 hover:shadow-xl transition-all hover:scale-105">
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                {departments.length}
              </div>
              <div className="text-gray-600 text-lg">מחלקות</div>
            </div>
          </div>

          {/* Popular Courses by Department */}
          <div className="space-y-12">
            <h3 className="text-3xl font-bold text-gray-900 text-center mb-8">
              {searchQuery ? `🔍 תוצאות חיפוש: "${searchQuery}"` : '📖 קורסים פופולריים'}
            </h3>
            
            {popularByDept.map(({ dept, courses }) => (
              <div key={dept} className="bg-white rounded-2xl shadow-md p-8 border-2 border-gray-100">
                <h4 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <span className="text-3xl">
                    {dept === 'מדעי המחשב' ? '💻' : 
                     dept === 'מתמטיקה' ? '📐' :
                     dept === 'כלכלה וניהול' ? '💰' : '📚'}
                  </span>
                  {dept}
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {courses.map(course => (
                    <Link
                      key={course.code}
                      href={`/courses/${course.code}`}
                      className="group p-5 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all hover:scale-105"
                    >
                      <div className="font-mono text-sm text-blue-600 font-bold mb-2">
                        {course.code}
                      </div>
                      <div className="text-gray-800 font-medium group-hover:text-blue-600 transition-colors leading-snug">
                        {course.name}
                      </div>
                      <div className="mt-3 text-sm text-gray-500">
                        {courseScanCounts[course.code] || 0} סריקות
                      </div>
                    </Link>
                  ))}
                </div>
                
                <Link
                  href={`/courses?dept=${encodeURIComponent(dept)}`}
                  className="mt-6 inline-block text-blue-600 font-medium hover:text-blue-700 hover:underline"
                >
                  ← ראה את כל הקורסים ב{dept}
                </Link>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-2xl p-12 text-center text-white">
            <h3 className="text-3xl font-bold mb-4">
              🎓 עזרו לקהילה הסטודנטים!
            </h3>
            <p className="text-xl mb-8 opacity-90">
              יש לכם סריקות מבחנים? העלו אותן ותרמו לסטודנטים אחרים
            </p>
            <Link
              href="/upload"
              className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-bold text-lg hover:shadow-xl transition-all hover:scale-105"
            >
              ➕ העלה סריקה עכשיו
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-lg font-bold mb-4">אודות Open Scans</h4>
                <p className="text-gray-400">
                  מאגר סריקות מבחנים חינמי ופתוח לכל סטודנטי האוניברסיטה הפתוחה.
                  נוצר על ידי סטודנטים, לסטודנטים.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-bold mb-4">קישורים</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/about" className="hover:text-white">אודות</Link></li>
                  <li><Link href="/how-it-works" className="hover:text-white">איך זה עובד?</Link></li>
                  <li><Link href="/guidelines" className="hover:text-white">הנחיות</Link></li>
                  <li><Link href="/contact" className="hover:text-white">צור קשר</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-bold mb-4">כתב ויתור</h4>
                <p className="text-gray-400 text-sm">
                  אתר זה אינו קשור לאוניברסיטה הפתוחה. 
                  התוכן מועלה על ידי משתמשים ונועד למטרות לימוד בלבד.
                </p>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>© 2026 Open Scans. נוצר עם ❤️ על ידי סטודנטים</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
