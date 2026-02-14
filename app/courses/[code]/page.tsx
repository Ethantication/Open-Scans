import Link from 'next/link';
import { INITIAL_COURSES } from '@/lib/courses';
import { createClient } from '@supabase/supabase-js';
import '@/app/globals.css';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function getCourseAndScans(courseCode: string) {
  try {
    console.log('Fetching course:', courseCode)
    
    // Get course from DB
    const { data: dbCourse, error: courseError } = await supabase
      .from('courses')
      .select('id, course_number, course_name, department')
      .eq('course_number', courseCode)
      .maybeSingle();

    if (courseError && courseError.code !== 'PGRST116') {
      console.error('Error fetching course:', courseError)
    }

    // Use DB course or fallback to INITIAL_COURSES
    const course = dbCourse || INITIAL_COURSES.find(c => c.code === courseCode)
    
    if (!course) {
      console.log('Course not found:', courseCode)
      return { course: null, scans: [] }
    }

    console.log('Course found:', course)

    // Get scans - use DB course id if available
    if (dbCourse) {
      const { data: scans, error: scansError } = await supabase
        .from('scans')
        .select('*')
        .eq('course_id', dbCourse.id)
        .order('created_at', { ascending: false });

      if (scansError) {
        console.error('Error fetching scans:', scansError)
        return { course, scans: [] }
      }

      console.log('Scans found:', scans?.length || 0)
      return { course, scans: scans || [] }
    }

    return { course, scans: [] }
  } catch (error) {
    console.error('Error in getCourseAndScans:', error);
    return { course: null, scans: [] }
  }
}

function getPublicUrl(filePath: string) {
  const { data } = supabase.storage
    .from('scans')
    .getPublicUrl(filePath);
  
  return data.publicUrl;
}

export default async function CoursePage({ params }: { params: { code: string } }) {
  const { course, scans } = await getCourseAndScans(params.code);
  
  if (!course) {
    return (
      <html lang="he" dir="rtl">
        <head>
          <title>קורס לא נמצא - Open Scans</title>
        </head>
        <body className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
          <div className="max-w-4xl mx-auto px-4 py-16 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">😕 קורס לא נמצא</h1>
            <p className="text-xl text-gray-600 mb-8">הקורס שחיפשת לא קיים במערכת</p>
            <Link 
              href="/"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              ← חזרה לדף הבית
            </Link>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="he" dir="rtl">
      <head>
        <title>{course.name} ({course.code}) - Open Scans</title>
      </head>
      <body className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold shadow-lg">
                  OS
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Open Scans
                  </h1>
                </div>
              </Link>
              
              <Link 
                href="/upload"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg transition-all hover:scale-105"
              >
                ➕ העלה סריקה
              </Link>
            </div>
          </div>
        </header>

        {/* Course Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
            >
              ← חזרה לדף הבית
            </Link>
            
            <div className="flex items-start justify-between">
              <div>
                <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg font-mono font-bold text-lg mb-4">
                  {course.code}
                </div>
                <h1 className="text-4xl font-bold mb-3">
                  {course.name}
                </h1>
                <p className="text-xl text-white/90">
                  {course.department}
                </p>
              </div>
              
              <div className="text-center bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-5xl font-bold mb-2">{scans.length}</div>
                <div className="text-lg">סריקות זמינות</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Filters */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border-2 border-gray-100">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-2">שנה</label>
                <select className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">כל השנים</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                </select>
              </div>
              
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-2">סמסטר</label>
                <select className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">כל הסמסטרים</option>
                  <option value="a">סמסטר א'</option>
                  <option value="b">סמסטר ב'</option>
                  <option value="summer">סמסטר קיץ</option>
                </select>
              </div>
              
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-2">מועד</label>
                <select className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">כל המועדים</option>
                  <option value="a">מועד א'</option>
                  <option value="b">מועד ב'</option>
                  <option value="c">מועד ג'</option>
                  <option value="midterm">בוחן אמצע</option>
                </select>
              </div>
            </div>
          </div>

          {/* Debug info - remove later */}
          {process.env.NODE_ENV === 'development' && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4 text-sm">
              <strong>Debug:</strong> Found {scans.length} scans for course {params.code}
            </div>
          )}

          {/* Scans List */}
          {scans.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-md p-12 text-center border-2 border-gray-100">
              <div className="text-6xl mb-4">📄</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                אין עדיין סריקות לקורס זה
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                היו הראשונים להעלות סריקה ולעזור לסטודנטים אחרים!
              </p>
              <Link
                href={`/upload?course=${course?.code}`}
                className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-bold text-lg hover:shadow-xl transition-all hover:scale-105"
              >
                ➕ העלה את הסריקה הראשונה
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {scans.map((scan: any) => {
                const publicUrl = getPublicUrl(scan.file_path);
                
                return (
                  <div
                    key={scan.id}
                    className="bg-white rounded-xl shadow-md p-6 border-2 border-gray-100 hover:shadow-lg transition-all hover:scale-[1.02]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-3xl">📄</span>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">
                              {scan.exam_type} • {scan.semester} {scan.year}
                            </h3>
                            <p className="text-sm text-gray-500">
                              הועלה על ידי <strong>{scan.uploader_name}</strong>
                              {scan.grade && ` • ציון: ${scan.grade}`}
                            </p>
                          </div>
                        </div>
                        
                        {scan.notes && (
                          <p className="text-gray-600 text-sm mb-3 bg-gray-50 p-3 rounded-lg">
                            💬 {scan.notes}
                          </p>
                        )}

                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>👁️ {scan.views || 0} צפיות</span>
                          <span>⬇️ {scan.downloads || 0} הורדות</span>
                          <span>📅 {new Date(scan.created_at).toLocaleDateString('he-IL')}</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <a
                          href={publicUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-center"
                        >
                          👁️ צפה
                        </a>
                        <a
                          href={publicUrl}
                          download
                          className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors text-center"
                        >
                          ⬇️ הורד
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
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
  );
}

// Generate static params for all courses
export function generateStaticParams() {
  return INITIAL_COURSES.map((course) => ({
    code: course.code,
  }));
}
