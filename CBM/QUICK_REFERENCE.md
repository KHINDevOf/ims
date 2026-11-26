# CBM - Quick Reference Guide

## 🚀 Start the System (5 Minutes)

### Terminal 1: Backend
```bash
npm run dev
# Server at http://localhost:5000
# Health: GET http://localhost:5000/api/health
```

### Terminal 2: Frontend
```bash
npm run client
# App at http://localhost:5173
```

### Login
```
Email: admin@school.com
Password: password123
```

---

## 📋 Common Tasks

### 1. Add a New Student
```
Menu → Students → + Add Student
Fill form → Click "Create Student"
```

### 2. Mark Attendance
```
Menu → Attendance
Select Class & Section & Date
Choose status per student → Click "Save Attendance"
```

### 3. Record a Grade
```
Menu → Grades
Search for student ID
Fill exam details → Click "Add Grade"
```

### 4. View Reports
```
Menu → Reports
Choose report type (Attendance/Academic/Dashboard)
Apply filters → Export CSV
```

### 5. Create a New User
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Teacher",
    "email": "teacher@school.com",
    "password": "securepass123",
    "role": "teacher"
  }'
```

---

## 🔗 Key API Endpoints

### Students
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/students` | Create |
| GET | `/students` | List all |
| GET | `/students/:id` | Get one |
| PUT | `/students/:id` | Update |
| DELETE | `/students/:id` | Delete |
| POST | `/students/:id/attendance` | Mark attendance |
| POST | `/students/:id/grades` | Add grade |
| GET | `/students/:id/report-card` | Get report |

### Reports
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/reports/dashboard` | KPI dashboard |
| GET | `/reports/attendance-report` | Attendance data |
| GET | `/reports/academic-report` | Academic data |

---

## 🗂️ Project Files

```
CBM/
├── server/
│   ├── models/
│   │   ├── Student.js ................ 22 fields
│   │   └── User.js .................. 7 fields
│   ├── routes/
│   │   ├── studentRoutes.js .......... 13 endpoints
│   │   ├── userRoutes.js ............ 4 endpoints
│   │   └── reportRoutes.js .......... 3 endpoints
│   ├── controllers/
│   │   └── studentController.js ..... 13 methods
│   └── index.js ..................... Entry point
│
├── client/
│   └── src/
│       ├── pages/
│       │   ├── Login.jsx
│       │   ├── Dashboard.jsx
│       │   ├── StudentList.jsx
│       │   ├── StudentForm.jsx
│       │   ├── StudentDetail.jsx
│       │   ├── AttendanceTracker.jsx
│       │   ├── GradeManagement.jsx
│       │   └── Reports.jsx
│       ├── components/
│       │   ├── Layout.jsx
│       │   ├── ProtectedRoute.jsx
│       │   ├── StatCard.jsx
│       │   └── LoadingSpinner.jsx
│       ├── services/
│       │   └── api.js
│       └── App.jsx
│
├── README.md ........................ Full docs
├── SETUP.md ......................... Quick start
└── PROJECT_SUMMARY.md ........... Detailed summary
```

---

## 🎯 Database Schema

### Student
```javascript
{
  rollNumber: "10A001",        // Unique
  firstName: "Rajesh",
  lastName: "Kumar",
  email: "rajesh@...",         // Unique
  phoneNumber: "9876543210",
  dateOfBirth: "2010-05-15",
  class: "10",                 // 10/11/12
  section: "A",                // A/B/C/D
  gender: "Male",
  address: { street, city, state, postalCode },
  parentInfo: { fatherName, motherName, parentPhone, parentEmail },
  attendance: [
    { date, status: "Present", remarksBy }
  ],
  grades: [
    { subject, exam, marks, outOf: 100, percentage, grade }
  ],
  isActive: true,
  createdAt, updatedAt
}
```

### User
```javascript
{
  name: "Admin User",
  email: "admin@school.com",   // Unique
  password: "hashed",          // Bcrypt
  role: "admin",               // admin/teacher/staff
  isActive: true,
  lastLogin: "2026-01-26",
  createdAt, updatedAt
}
```

---

## 🔐 Authentication Flow

```
1. User enters email & password
   ↓
2. Backend validates & hashes password
   ↓
3. JWT token generated (7 days)
   ↓
4. Token stored in localStorage
   ↓
5. All API requests include token in header
   ↓
6. ProtectedRoute checks token before showing page
```

---

## 📊 Data Flow Example

### Create Student with Attendance & Grade

```
1. UI: StudentForm.jsx
   └─→ POST /students
   └─→ Backend: studentController.createStudent()
   └─→ Database: Save to Student collection
   └─→ Response: Student ID returned

2. UI: AttendanceTracker.jsx
   └─→ POST /students/:id/attendance
   └─→ Backend: studentController.addAttendance()
   └─→ Database: Push to attendance array
   └─→ Response: Updated student

3. UI: GradeManagement.jsx
   └─→ POST /students/:id/grades
   └─→ Backend: studentController.addGrade()
   └─→ Database: Push to grades array
   └─→ Response: Updated student

4. UI: Reports.jsx
   └─→ GET /reports/academic-report
   └─→ Backend: Aggregate student data
   └─→ Database: Query multiple records
   └─→ Response: Report with calculations
```

---

## 🛠️ Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is free
lsof -i :5000

# Check MongoDB connection
# Edit .env with correct MONGODB_URI
```

### Frontend won't load
```bash
# Clear browser cache
# Check if API is running
# Check console for errors
```

### Can't login
```bash
# Check credentials in .env
# Verify user exists in database
# Check JWT_SECRET in .env
```

### API returns 404
```bash
# Verify endpoint URL
# Check request method (GET/POST/etc)
# Verify authentication token
```

---

## 📈 Performance Tips

1. **Pagination**: Use default pagination (10 per page)
2. **Search**: Use indexed fields (rollNumber, email)
3. **Reports**: Filter by date range to reduce data
4. **Cache**: Consider Redis for dashboard

---

## 🔧 Configuration

### .env Variables
```env
MONGODB_URI=mongodb://localhost:27017/cbm-students
PORT=5000
NODE_ENV=development
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
BCRYPT_ROUNDS=10
API_BASE_URL=http://localhost:5000/api
CLIENT_URL=http://localhost:3000
```

### Frontend .env (.env file)
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 📱 UI Navigation

```
Login
├─→ Dashboard ..................... [KPIs, Charts]
├─→ Students ...................... [List, Create, Edit, Delete]
├─→ Attendance .................... [Mark, View, Track]
├─→ Grades ........................ [Add, Manage, View]
└─→ Reports ....................... [Attendance, Academic, Export]
```

---

## 🎓 Sample Data Generation

### Create Sample Student
```bash
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "rollNumber": "10A001",
    "firstName": "Raj",
    "lastName": "Kumar",
    "email": "raj@example.com",
    "phoneNumber": "9876543210",
    "class": "10",
    "section": "A"
  }'
```

### Create Sample User
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@school.com",
    "password": "password123",
    "role": "teacher"
  }'
```

---

## 📚 Code Examples

### Add Attendance via API
```javascript
const addAttendance = async (studentId) => {
  const response = await fetch(`/api/students/${studentId}/attendance`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      date: '2026-01-26',
      status: 'Present',
      remarksBy: 'Manual'
    })
  });
  return await response.json();
};
```

### Fetch Dashboard Data
```javascript
const fetchDashboard = async () => {
  const response = await fetch('/api/reports/dashboard', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await response.json();
};
```

---

## 🚀 Deployment Checklist

- [ ] Update MongoDB URI to Atlas
- [ ] Set strong JWT_SECRET
- [ ] Configure CORS origins
- [ ] Enable HTTPS
- [ ] Add rate limiting
- [ ] Setup logging
- [ ] Add monitoring
- [ ] Backup database
- [ ] Test all endpoints
- [ ] Load testing

---

## 📞 Support Resources

| Resource | Link |
|----------|------|
| README | /CBM/README.md |
| Setup Guide | /CBM/SETUP.md |
| Project Summary | /CBM/PROJECT_SUMMARY.md |
| GitHub Repo | https://github.com/KHINDevOf/ims |
| Pull Request | https://github.com/KHINDevOf/ims/pull/1 |

---

## 🎉 You're All Set!

Your **CBM Student Records Management System** is ready to use! 

**Next Steps:**
1. ✅ Start backend (`npm run dev`)
2. ✅ Start frontend (`npm run client`)
3. ✅ Login with demo credentials
4. ✅ Explore all features
5. ✅ Create your data
6. ✅ Generate reports

---

**Happy Learning! 🚀**

*CBM v1.0.0 | 30-Frame Complete System*
