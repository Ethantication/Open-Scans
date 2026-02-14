import Link from 'next/link'

export default function HowItWorksPage() {
  return (
    <html lang="he" dir="rtl">
      <head>
        <title>איך זה עובד? - Open Scans</title>
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
              איך זה עובד? 🎓
            </h2>

            <div className="space-y-12">
              {/* For Students Looking for Scans */}
              <div>
                <h3 className="text-2xl font-bold text-blue-600 mb-6">🔍 לסטודנטים המחפשים סריקות</h3>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900 mb-2">חפש את הקורס שלך</h4>
                      <p className="text-gray-600">
                        בדף הבית, השתמש בשורת החיפוש או גלול למטה למצוא את הקורס שלך.
                        אפשר לחפש לפי מספר קורס או שם.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900 mb-2">סנן לפי צרכים</h4>
                      <p className="text-gray-600">
                        בדף הקורס, אפשר לסנן סריקות לפי שנה, סמסטר ומועד.
                        זה עוזר למצוא בדיוק את המבחן שאתה צריך.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900 mb-2">צפה או הורד</h4>
                      <p className="text-gray-600">
                        לחץ על "צפה" כדי לראות את המבחן בדפדפן, או "הורד" כדי לשמור אותו במחשב.
                        הכל חינמי ובלי צורך בהתחברות!
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-12">
                <h3 className="text-2xl font-bold text-green-600 mb-6">📤 לסטודנטים שרוצים להעלות</h3>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900 mb-2">לחץ על "העלה סריקה"</h4>
                      <p className="text-gray-600">
                        הכפתור נמצא בראש העמוד. לחיצה עליו תעביר אותך למסך התחייבות.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900 mb-2">קרא והסכם להתחייבות</h4>
                      <p className="text-gray-600">
                        חשוב מאוד! קרא את ההתחייבות ולחץ "אני מסכים" רק אם אתה באמת מתחייב
                        להעלות תוכן לגיטימי ולא מזיק.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900 mb-2">מלא פרטים</h4>
                      <p className="text-gray-600 mb-3">
                        בחר את הקורס (או צור חדש), מלא פרטי מבחן (שנה, סמסטר, מועד),
                        הכנס את השם שלך והעלה קובץ PDF.
                      </p>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <strong>טיפ:</strong> אפשר להוסיף הערות ולספר על המבחן - זה עוזר מאוד לאחרים!
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold">
                      4
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900 mb-2">העלה!</h4>
                      <p className="text-gray-600">
                        לחץ "העלה סריקה" והמתן כמה שניות. הסריקה תעלה למערכת ותהיה
                        זמינה מיד לכל הסטודנטים. תודה על התרומה! 🎉
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border-2 border-blue-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">💡 עצות שימושיות</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span><strong>איכות הסריקה:</strong> כדאי לסרוק בבהירות גבוהה וודא שהטקסט קריא</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span><strong>פרטים נכונים:</strong> ודא שהשנה, הסמסטר והמועד נכונים - זה עוזר לאחרים למצוא</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span><strong>הערות:</strong> אם יש משהו מיוחד במבחן, כתוב בהערות</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span><strong>רק שאלות:</strong> אל תעלה פתרונות - רק את המבחן עצמו</span>
                  </li>
                </ul>
              </div>

              <div className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">⚠️ חשוב לדעת</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• כל העלאה מתועדת במערכת (שם, תאריך)</li>
                  <li>• העלאת תוכן מזיק או מטעה תוביל להסרה ודיווח</li>
                  <li>• השתמש במבחנים למטרות לימוד בלבד</li>
                  <li>• אנחנו שומרים לנו את הזכות להסיר תוכן בלתי הולם</li>
                </ul>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200 flex justify-between">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                ← חזרה לדף הבית
              </Link>
              <Link
                href="/upload"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
              >
                התחל להעלות →
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
