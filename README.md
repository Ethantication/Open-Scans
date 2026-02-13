# 🎓 Open Scans

מאגר סריקות מבחנים של האוניברסיטה הפתוחה

## 📚 מה זה?

**Open Scans** הוא מאגר סריקות מבחנים חינמי ופתוח לכל סטודנטי האוניברסיטה הפתוחה.
נוצר על ידי סטודנטים, לסטודנטים.

## ✨ פיצ'רים

- ✅ העלאה וצפייה בסריקות מבחנים
- ✅ חיפוש לפי קורס, שנה, סמסטר ומועד
- ✅ ממשק עברי נקי ומודרני (RTL)
- ✅ מערכת נקודות למעלים
- ✅ צפייה ב-PDF ישירות בדפדפן
- ✅ ללא פרסומות, חינמי לחלוטין

## 🚀 התחלה מהירה

### דרישות מקדימות
- Node.js 18+ 
- npm או yarn

### התקנה

```bash
# Clone the repository
git clone <your-repo-url>
cd open-scans

# Install dependencies
npm install

# Run development server
npm run dev
```

האתר יהיה זמין ב: `http://localhost:3000`

## 🛠️ טכנולוגיות

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Storage:** Supabase Storage
- **Auth:** Supabase Auth
- **Hosting:** Vercel

## 📁 מבנה הפרויקט

```
open-scans/
├── app/
│   ├── page.tsx              # דף הבית
│   ├── courses/[code]/       # דף קורס בודד
│   ├── upload/               # דף העלאת סריקה
│   └── globals.css           # סגנונות גלובליים
├── components/               # קומפוננטות React
├── lib/
│   ├── courses.ts            # רשימת קורסים
│   └── supabase.ts           # Supabase client
├── public/                   # קבצים סטטיים
└── README.md
```

## 🗄️ Database Schema

### Tables

**courses**
- id (uuid, primary key)
- course_number (text, unique)
- course_name (text)
- department (text)

**scans**
- id (uuid, primary key)
- course_id (uuid, foreign key)
- user_id (uuid, foreign key)
- file_path (text)
- year (integer)
- semester (text)
- exam_type (text)
- grade (integer)
- notes (text)
- uploader_name (text)
- views (integer)
- downloads (integer)
- created_at (timestamp)

**users**
- id (uuid, primary key)
- email (text, unique)
- display_name (text)
- points (integer)
- uploads_count (integer)
- created_at (timestamp)

## 🔧 Setup Supabase

1. צור פרויקט ב-[Supabase](https://supabase.com)
2. העתק את ה-URL ואת ה-API key
3. צור קובץ `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

4. הרץ את ה-SQL schema (יסופק בשלב הבא)

## 📝 Contributing

תרומות תמיד מתקבלות בברכה! אנא:
1. צור fork של הפרויקט
2. צור branch חדש
3. בצע commit של השינויים
4. פתח Pull Request

## ⚖️ כתב ויתור

אתר זה אינו קשור לאוניברסיטה הפתוחה. 
התוכן מועלה על ידי משתמשים ונועד למטרות לימוד בלבד.

## 📄 רישיון

MIT License

## 💝 תודות

תודה לכל הסטודנטים שתורמים ועוזרים לקהילה!

---

נוצר עם ❤️ על ידי סטודנטים לסטודנטים
