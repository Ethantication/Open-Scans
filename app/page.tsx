import Link from 'next/link';
import { INITIAL_COURSES } from '@/lib/courses';
import './globals.css';

export default function Home() {
  const courseCount = INITIAL_COURSES.length;
  const departments = Array.from(new Set(INITIAL_COURSES.map(c => c.department)));
  
  // Group popular courses by department
  const popularByDept = departments.map(dept => ({
    dept,
    courses: INITIAL_COURSES.filter(c => c.department === dept).slice(0, 3)
  }));

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
                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold shadow-lg">
                  OS
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
                <Link 
                  href="/login"
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:border-blue-600 hover:text-blue-600 transition-all"
                >
                  התחבר
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
                className="w-full px-6 py-5 text-lg border-2 border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
              <button className="absolute left-4 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                חפש
              </button>
            </div>
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
                0
              </div>
              <div className="text-gray-600 text-lg">סריקות במאגר</div>
              <div className="text-sm text-gray-500 mt-1">היו הראשונים להעלות!</div>
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
              📖 קורסים פופולריים
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
                        0 סריקות
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
