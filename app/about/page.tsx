import Link from 'next/link'

export default function AboutPage() {
  return (
    <html lang="he" dir="rtl">
      <head>
        <title>אודות - Open Scans</title>
      </head>
      <body className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity w-fit">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold shadow-lg">
                OS
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
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="bg-white rounded-2xl shadow-xl p-12 border-2 border-gray-200">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              אודות Open Scans 📚
            </h2>

            <div className="space-y-8 text-lg text-gray-700">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">מה זה Open Scans?</h3>
                <p className="leading-relaxed">
                  Open Scans הוא מאגר סריקות מבחנים חינמי ופתוח לכל סטודנטי האוניברסיטה הפתוחה.
                  הפרויקט נוצר מתוך הבנה שסטודנטים צריכים גישה חופשית לחומרי לימוד ומבחנים קודמים
                  כדי להתכונן טוב יותר לבחינות.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">המטרה שלנו</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 text-xl">✓</span>
                    <span>לספק גישה חופשית וקלה לסריקות מבחנים מכל הקורסים</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 text-xl">✓</span>
                    <span>לעזור לסטודנטים להתכונן טוב יותר לבחינות</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 text-xl">✓</span>
                    <span>לבנות קהילת סטודנטים תומכת ומשתפת</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 text-xl">✓</span>
                    <span>לשמור על שקיפות ונגישות בחומרי לימוד</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">איך זה עובד?</h3>
                <p className="leading-relaxed mb-4">
                  המערכת פשוטה: סטודנטים מעלים סריקות של מבחנים שעשו, וכל הקהילה יכולה לגשת אליהם.
                  אין צורך בהתחברות לצפייה, אבל מעלים צריכים להתחייב שהם מעלים תוכן לגיטימי בלבד.
                </p>
                <p className="leading-relaxed">
                  כל סריקה מתויגת לפי קורס, שנה, סמסטר ומועד, מה שמקל על החיפוש והגישה.
                </p>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">👨‍💻 מי בנה את זה?</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold">
                    EH
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-900">Ethan Hanoch</p>
                    <p className="text-gray-600">סטודנט, מפתח, ובונה קהילות</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  הי! אני איתן, סטודנט באוניברסיטה הפתוחה שראיתי את הצורך במאגר סריקות נגיש לכולם.
                  בניתי את Open Scans כפרויקט קהילתי שיעזור לסטודנטים להצליח בלימודים.
                </p>
                <a
                  href="https://il.linkedin.com/in/ethanorjoseph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  צור קשר ב-LinkedIn
                </a>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">טכנולוגיה</h3>
                <p className="leading-relaxed mb-3">
                  האתר נבנה באמצעות טכנולוגיות מודרניות:
                </p>
                <ul className="space-y-2">
                  <li>• <strong>Next.js 14</strong> - Framework לבניית האתר</li>
                  <li>• <strong>Supabase</strong> - מסד נתונים ואחסון קבצים</li>
                  <li>• <strong>Vercel</strong> - אחסון ו-deployment</li>
                  <li>• <strong>Tailwind CSS</strong> - עיצוב ומראה</li>
                </ul>
              </div>

              <div className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">⚠️ כתב ויתור חשוב</h3>
                <p className="text-gray-700">
                  Open Scans הוא פרויקט עצמאי ואינו קשור באופן רשמי לאוניברסיטה הפתוחה.
                  התוכן באתר מועלה על ידי סטודנטים ונועד למטרות לימוד בלבד.
                  אנחנו לא אחראים לתוכן שמשתמשים מעלים ושומרים לעצמנו את הזכות להסיר תוכן בלתי הולם.
                </p>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                ← חזרה לדף הבית
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
