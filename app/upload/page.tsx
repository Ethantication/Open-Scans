'use client'

import { useState } from 'react'
import Link from 'next/link'
import { INITIAL_COURSES, DEPARTMENTS } from '@/lib/courses'

export default function UploadPage() {
  const [step, setStep] = useState<'commitment' | 'form'>('commitment')
  const [formData, setFormData] = useState({
    courseCode: '',
    newCourseName: '',
    newCourseDepartment: '',
    year: new Date().getFullYear().toString(),
    semester: '',
    examType: '',
    grade: '',
    uploaderName: '',
    notes: '',
  })
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [error, setError] = useState('')

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i)

  const handleCommitment = () => {
    setStep('form')
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        setError('רק קבצי PDF מותרים')
        return
      }
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('הקובץ גדול מדי (מקסימום 10MB)')
        return
      }
      setFile(selectedFile)
      setError('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      // Validation
      if (!file) {
        setError('יש לבחור קובץ PDF')
        setIsSubmitting(false)
        return
      }

      if (!formData.courseCode) {
        setError('יש למלא מספר קורס')
        setIsSubmitting(false)
        return
      }

      if (!formData.semester || !formData.examType || !formData.uploaderName) {
        setError('יש למלא את כל השדות החובה')
        setIsSubmitting(false)
        return
      }

      // If adding new course, validate required fields
      if (formData.newCourseName && (!formData.newCourseDepartment)) {
        setError('קורס חדש דורש גם מחלקה')
        setIsSubmitting(false)
        return
      }

      // Create FormData for upload
      const uploadFormData = new FormData()
      uploadFormData.append('file', file)
      uploadFormData.append('courseCode', formData.courseCode)
      uploadFormData.append('newCourseName', formData.newCourseName)
      uploadFormData.append('newCourseDepartment', formData.newCourseDepartment)
      uploadFormData.append('year', formData.year)
      uploadFormData.append('semester', formData.semester)
      uploadFormData.append('examType', formData.examType)
      uploadFormData.append('grade', formData.grade)
      uploadFormData.append('uploaderName', formData.uploaderName)
      uploadFormData.append('notes', formData.notes)

      // Upload to API
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'שגיאה בהעלאה')
      }

      setUploadSuccess(true)
      
      // Redirect to course page after 2 seconds
      setTimeout(() => {
        window.location.href = `/courses/${result.courseCode}`
      }, 2000)

    } catch (err: any) {
      setError(err.message || 'שגיאה בהעלאת הקובץ')
      setIsSubmitting(false)
    }
  }

  if (step === 'commitment') {
    return (
      <html lang="he" dir="rtl">
        <head>
          <title>העלאת סריקה - Open Scans</title>
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

          {/* Commitment Screen */}
          <div className="max-w-3xl mx-auto px-4 py-16">
            <div className="bg-white rounded-2xl shadow-xl p-12 border-2 border-gray-200">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">🤝</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  התחייבות למעלה
                </h2>
                <p className="text-lg text-gray-600">
                  לפני שתעלה סריקה, אנא קרא והסכם להתחייבות הבאה:
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-8 mb-8 space-y-4 text-right border-2 border-gray-200">
                <h3 className="font-bold text-xl text-gray-900 mb-4">אני מתחייב/ת:</h3>
                
                <div className="flex items-start gap-3">
                  <span className="text-green-600 text-xl">✓</span>
                  <p className="text-gray-700">
                    <strong>להעלות רק סריקות אמיתיות</strong> של מבחנים שלמדתי באוניברסיטה הפתוחה
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-green-600 text-xl">✓</span>
                  <p className="text-gray-700">
                    <strong>לא להעלות תוכן מזיק, פוגעני או מטעה</strong> - כולל וירוסים, קבצים זדוניים, או תוכן בלתי הולם
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-green-600 text-xl">✓</span>
                  <p className="text-gray-700">
                    <strong>לא להעלות פתרונות מבחנים</strong> - רק את השאלות
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-green-600 text-xl">✓</span>
                  <p className="text-gray-700">
                    <strong>לכבד זכויות יוצרים</strong> ולהשתמש בחומר למטרות לימוד בלבד
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-green-600 text-xl">✓</span>
                  <p className="text-gray-700">
                    <strong>להבין שהעלאת תוכן מזיק היא עבירה פלילית</strong> ועלולה להוביל לנקיטת הליכים משפטיים
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 mb-8">
                <p className="text-sm text-yellow-800">
                  <strong>⚠️ שימו לב:</strong> כל העלאה תועד במערכת כולל שם המעלה, תאריך, וכתובת IP. 
                  העלאת תוכן מזיק תוביל להסרה מיידית ודיווח לרשויות הרלוונטיות.
                </p>
              </div>

              <div className="flex gap-4">
                <Link
                  href="/"
                  className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all text-center"
                >
                  ביטול
                </Link>
                <button
                  onClick={handleCommitment}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  אני מסכים/ה ומתחייב/ת ←
                </button>
              </div>
            </div>
          </div>
        </body>
      </html>
    )
  }

  if (uploadSuccess) {
    return (
      <html lang="he" dir="rtl">
        <head>
          <title>הועלה בהצלחה! - Open Scans</title>
        </head>
        <body className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center max-w-md">
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              הועלה בהצלחה!
            </h2>
            <p className="text-gray-600 mb-2">
              תודה רבה על התרומה לקהילה!
            </p>
            <p className="text-sm text-gray-500">
              מעביר אותך לדף הקורס...
            </p>
          </div>
        </body>
      </html>
    )
  }

  return (
    <html lang="he" dir="rtl">
      <head>
        <title>העלאת סריקה - Open Scans</title>
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

        {/* Upload Form */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              📤 העלאת סריקה חדשה
            </h2>

            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6">
                <p className="text-red-800 font-medium">⚠️ {error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Course Selection */}
              <div>
                <label className="block text-lg font-bold text-gray-900 mb-3">
                  1. בחר קורס <span className="text-red-500">*</span>
                </label>
                
                <select
                  value={formData.courseCode}
                  onChange={(e) => setFormData({ ...formData, courseCode: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                >
                  <option value="">בחר קורס מהרשימה...</option>
                  {INITIAL_COURSES.map(course => (
                    <option key={course.code} value={course.code}>
                      {course.code} - {course.name}
                    </option>
                  ))}
                </select>

                <p className="text-sm text-gray-500 mt-2">
                  לא מצאת את הקורס? הוסף קורס חדש למטה ↓
                </p>
              </div>

              {/* Add New Course */}
              <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4">או הוסף קורס חדש:</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      מספר קורס
                    </label>
                    <input
                      type="text"
                      placeholder="לדוגמה: 20441"
                      value={formData.courseCode || ''}
                      onChange={(e) => setFormData({ ...formData, courseCode: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      שם הקורס
                    </label>
                    <input
                      type="text"
                      placeholder="לדוגמה: מבוא למדעי המחשב"
                      value={formData.newCourseName}
                      onChange={(e) => setFormData({ ...formData, newCourseName: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      מחלקה
                    </label>
                    <select
                      value={formData.newCourseDepartment}
                      onChange={(e) => setFormData({ ...formData, newCourseDepartment: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">בחר מחלקה...</option>
                      {DEPARTMENTS.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Exam Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    שנה <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    סמסטר <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.semester}
                    onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">בחר...</option>
                    <option value="א">סמסטר א׳</option>
                    <option value="ב">סמסטר ב׳</option>
                    <option value="קיץ">סמסטר קיץ</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    מועד <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.examType}
                    onChange={(e) => setFormData({ ...formData, examType: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">בחר...</option>
                    <option value="מועד א">מועד א׳</option>
                    <option value="מועד ב">מועד ב׳</option>
                    <option value="מועד ג">מועד ג׳</option>
                    <option value="בוחן">בוחן אמצע</option>
                  </select>
                </div>
              </div>

              {/* Personal Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    השם שלך <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="איך לקרוא לך?"
                    value={formData.uploaderName}
                    onChange={(e) => setFormData({ ...formData, uploaderName: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    הציון שקיבלת (אופציונלי)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="0-100"
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  הערות (אופציונלי)
                </label>
                <textarea
                  rows={3}
                  placeholder="מידע נוסף, טיפים, הערות..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-lg font-bold text-gray-900 mb-3">
                  2. העלה קובץ PDF <span className="text-red-500">*</span>
                </label>
                
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 transition-colors">
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer"
                  >
                    <div className="text-5xl mb-4">📄</div>
                    {file ? (
                      <div>
                        <p className="text-lg font-bold text-green-600 mb-2">✓ {file.name}</p>
                        <p className="text-sm text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-lg font-medium text-gray-700 mb-2">
                          לחץ לבחירת קובץ או גרור לכאן
                        </p>
                        <p className="text-sm text-gray-500">
                          PDF בלבד, עד 10MB
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Submit */}
              <div className="flex gap-4 pt-4">
                <Link
                  href="/"
                  className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all text-center"
                >
                  ביטול
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? '⏳ מעלה...' : '🚀 העלה סריקה'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </body>
    </html>
  )
}
