import Link from 'next/link'

export default function GuidelinesPage() {
  return (
    <html lang="he" dir="rtl">
      <head>
        <title>הנחיות - Open Scans</title>
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
              הנחיות שימוש 📋
            </h2>

            <div className="space-y-8">
              <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                <h3 className="text-2xl font-bold text-green-900 mb-4">✅ מה כן מותר</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>להעלות סריקות של מבחנים שעשיתם באוניברסיטה הפתוחה</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>להעלות בוחנים אמצע וסופיים</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>להוסיף הערות שיעזרו לסטודנטים אחרים</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>לצפות ולהוריד סריקות למטרות לימוד</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>לשתף את האתר עם חברים</span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-50 rounded-xl p-6 border-2 border-red-200">
                <h3 className="text-2xl font-bold text-red-900 mb-4">❌ מה אסור</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold">✗</span>
                    <span><strong>אסור להעלות פתרונות</strong> - רק את השאלות!</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold">✗</span>
                    <span><strong>אסור להעלות תוכן מזיק</strong> - וירוסים, קבצים זדוניים, או תוכן פוגעני</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold">✗</span>
                    <span><strong>אסור להעלות קבצים מטעים</strong> - קבצים שאינם מבחנים או עם מידע שגוי</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold">✗</span>
                    <span><strong>אסור למכור או לסחור</strong> - הכל חינמי ופתוח לכולם</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold">✗</span>
                    <span><strong>אסור להעלות ספאם</strong> - העלאות חוזרות או לא רלוונטיות</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">📄 דרישות טכניות</h3>
                <div className="bg-gray-50 rounded-xl p-6">
                  <ul className="space-y-3 text-gray-700">
                    <li><strong>פורמט:</strong> רק קבצי PDF</li>
                    <li><strong>גודל מקסימלי:</strong> 10MB</li>
                    <li><strong>איכות:</strong> ודא שהטקסט קריא ובהיר</li>
                    <li><strong>כיוון:</strong> ודא שהדפים בכיוון נכון</li>
                    <li><strong>שלמות:</strong> וודא שכל הדפים קיימים</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">🔒 פרטיות ואבטחה</h3>
                <div className="space-y-4 text-gray-700">
                  <p>
                    <strong>מה נשמר:</strong> כשאתה מעלה סריקה, אנחנו שומרים את השם שהזנת,
                    תאריך ההעלאה, ופרטי המבחן. לא נשמר מייל או מידע אישי נוסף.
                  </p>
                  <p>
                    <strong>ביטחון:</strong> כל הקבצים נסרקים אוטומטית ועוברים בדיקות אבטחה.
                    קבצים חשודים נחסמים אוטומטית.
                  </p>
                  <p>
                    <strong>תיעוד:</strong> כל העלאה מתועדת כולל כתובת IP ותאריך, למטרות
                    אבטחה ומניעת שימוש לרעה.
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">⚖️ שימוש הוגן וזכויות יוצרים</h3>
                <div className="space-y-3 text-gray-700">
                  <p>
                    <strong>למטרות לימוד בלבד:</strong> השימוש בסריקות מיועד למטרות לימוד בלבד.
                    אסור להפיץ, למכור, או לעשות שימוש מסחרי בתוכן.
                  </p>
                  <p>
                    <strong>כבוד למרצים:</strong> זכרו שהמבחנים נוצרו על ידי המרצים.
                    השתמשו בהם בכבוד ובאחריות.
                  </p>
                  <p>
                    <strong>זכויות האוניברסיטה:</strong> אם האוניברסיטה הפתוחה תבקש להסיר תוכן,
                    אנחנו נעשה זאת מיד.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">🚨 דיווח על תוכן בלתי הולם</h3>
                <div className="bg-red-50 rounded-xl p-6 border-2 border-red-200">
                  <p className="text-gray-700 mb-4">
                    אם מצאת תוכן שמפר את ההנחיות (תוכן מזיק, מטעה, פתרונות, וכו'),
                    אנא דווח עליו באחת מהדרכים הבאות:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li>• שלח הודעה ב-<Link href="/contact" className="text-blue-600 underline">צור קשר</Link></li>
                    <li>• פנה ישירות ליוצר ב-<a href="https://il.linkedin.com/in/ethanorjoseph" className="text-blue-600 underline">LinkedIn</a></li>
                  </ul>
                  <p className="text-gray-700 mt-4">
                    <strong>נסקור כל דיווח תוך 24-48 שעות ונסיר תוכן בלתי הולם מיד.</strong>
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">💪 עזור לקהילה</h3>
                <div className="space-y-3 text-gray-700">
                  <p>אתה יכול לעזור לשפר את האתר:</p>
                  <ul className="space-y-2">
                    <li>• העלה סריקות איכותיות וברורות</li>
                    <li>• הוסף הערות שיעזרו לאחרים</li>
                    <li>• שתף את האתר עם סטודנטים אחרים</li>
                    <li>• דווח על תוכן בלתי הולם</li>
                    <li>• שלח משוב והצעות לשיפור</li>
                  </ul>
                </div>
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
                העלה סריקה →
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
