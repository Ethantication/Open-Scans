import Link from 'next/link'

export default function ContactPage() {
  return (
    <html lang="he" dir="rtl">
      <head>
        <title>צור קשר - Open Scans</title>
      </head>
      <body className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
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

        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="bg-white rounded-2xl shadow-xl p-12 border-2 border-gray-200">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              צור קשר 📬
            </h2>

            <div className="space-y-8">
              <p className="text-xl text-gray-700">
                יש לך שאלה, הצעה, או רוצה לדווח על בעיה? נשמח לשמוע ממך!
              </p>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border-2 border-blue-200">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold">
                    EH
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Ethan Hanoch</h3>
                    <p className="text-gray-600">מייסד ומפתח Open Scans</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <a
                    href="https://il.linkedin.com/in/ethanorjoseph"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-all"
                  >
                    <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <div className="flex-1">
                      <div className="font-bold text-gray-900">LinkedIn</div>
                      <div className="text-sm text-gray-600">linkedin.com/in/ethanorjoseph</div>
                    </div>
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">💡 למה לפנות אלינו?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="text-3xl mb-3">🐛</div>
                    <h4 className="font-bold text-lg text-gray-900 mb-2">דיווח על באג</h4>
                    <p className="text-sm text-gray-600">
                      מצאת בעיה טכנית? משהו לא עובד? ספר לנו!
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="text-3xl mb-3">💡</div>
                    <h4 className="font-bold text-lg text-gray-900 mb-2">רעיון לשיפור</h4>
                    <p className="text-sm text-gray-600">
                      יש לך רעיון איך לשפר את האתר? נשמח לשמוע!
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="text-3xl mb-3">🚨</div>
                    <h4 className="font-bold text-lg text-gray-900 mb-2">דיווח על תוכן</h4>
                    <p className="text-sm text-gray-600">
                      מצאת תוכן בלתי הולם או מזיק? דווח מיד!
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="text-3xl mb-3">❓</div>
                    <h4 className="font-bold text-lg text-gray-900 mb-2">שאלות כלליות</h4>
                    <p className="text-sm text-gray-600">
                      יש שאלה על האתר או איך להשתמש בו? שאל!
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">⏱️ זמני תגובה</h3>
                <p className="text-gray-700">
                  אנסה לענות לכל פניה תוך <strong>24-48 שעות</strong>.
                  דיווחים על תוכן מזיק מטופלים בעדיפות עליונה!
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">🤝 רוצה לתרום?</h3>
                <p className="text-gray-700 mb-4">
                  Open Scans הוא פרויקט קהילתי. אם אתה מפתח/ת ורוצה לעזור בפיתוח,
                  או אם יש לך כישורים אחרים שיכולים לעזור - נשמח לשמוע!
                </p>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>תחומים שאנחנו מחפשים עזרה בהם:</strong> עיצוב UI/UX, בדיקות איכות,
                    תרגום לשפות נוספות, ניהול קהילה, ועוד.
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">📱 עקוב אחרינו</h3>
                <p className="text-gray-700 mb-4">
                  בקרוב נשתף עדכונים, טיפים, וחדשות על האתר!
                </p>
                <div className="text-sm text-gray-500">
                  (רשתות חברתיות בקרוב...)
                </div>
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
