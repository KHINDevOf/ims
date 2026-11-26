# CBM - Coolruntime-Based Student Records Management System

> A complete 30-frame full-stack prototype for managing student records, attendance, grades, and academic analytics.

## 📋 System Overview

**CBM** is a comprehensive student management system built with:

- **Backend**: Node.js + Express + MongoDB
- **Frontend**: React + Vite + Tailwind CSS
- **Features**: CRUD operations, Attendance tracking, Grade management, Analytics reports

---

## 🎯 30-Frame Architecture

### Backend Frames (20)
| Frame | Component | Description |
|-------|-----------|-------------|
| 1-5 | Student CRUD | Create, Read, Update, Delete, Soft Delete |
| 6-7 | Search & Filter | By class/section, Roll number |
| 8-9 | Attendance System | Mark & retrieve attendance records |
| 10-11 | Grade Management | Add & retrieve student grades |
| 12-13 | Analytics | Report cards, Class statistics |
| 14-17 | User Auth | Register, Login, User management |
| 18-20 | Reports API | Attendance, Academic, Dashboard reports |

### Frontend Frames (10)
| Frame | Page | Features |
|-------|------|----------|
| 21 | App Router | Main app setup with routing |
| 22 | API Service | Axios interceptors & API calls |
| 23 | Dashboard | KPI stats & class breakdown |
| 24 | Student List | Paginated student table |
| 25 | Student Form | Create/Edit student details |
| 26 | Student Detail | Tabs: Info, Attendance, Grades, Report |
| 27 | Attendance Tracker | Mark attendance by class/date |
| 28 | Grade Management | Add/view student grades |
| 29 | Reports | Attendance, Academic, Dashboard reports |
| 30 | Login | User authentication page |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ & npm
- MongoDB (local or Atlas)
- Git

### Installation

#### 1. Clone & Setup
```bash
cd CBM
npm install
cd client && npm install && cd ..
```

#### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env with your MongoDB URI
```

```env
MONGODB_URI=mongodb://localhost:27017/cbm-students
PORT=5000
JWT_SECRET=your_secret_key_here
```

#### 3. Start MongoDB
```bash
# If using local MongoDB
mongod
```

#### 4. Run Backend
```bash
npm run dev
# Server runs on http://localhost:5000
```

#### 5. Run Frontend (New Terminal)
```bash
npm run client
# Client runs on http://localhost:5173
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Student Endpoints

#### Create Student
```
POST /students
Content-Type: application/json

{
  "rollNumber": "10A001",
  "firstName": "Rajesh",
  "lastName": "Kumar",
  "email": "rajesh@school.com",
  "phoneNumber": "9876543210",
  "class": "10",
  "section": "A"
}
```

#### Get All Students
```
GET /students?page=1&limit=10
```

#### Get Student by ID
```
GET /students/:id
```

#### Update Student
```
PUT /students/:id
```

#### Delete Student (Soft)
```
DELETE /students/:id
```

#### Mark Attendance
```
POST /students/:id/attendance
{
  "date": "2026-01-26",
  "status": "Present",
  "remarksBy": "Teacher Name"
}
```

#### Add Grade
```
POST /students/:id/grades
{
  "subject": "Mathematics",
  "exam": "Mid Term",
  "marks": 85,
  "outOf": 100,
  "grade": "A"
}
```

#### Get Report Card
```
GET /students/:id/report-card
```

### User Endpoints

#### Register
```
POST /users/register
{
  "name": "Admin User",
  "email": "admin@school.com",
  "password": "securepassword123",
  "role": "admin"
}
```

#### Login
```
POST /users/login
{
  "email": "admin@school.com",
  "password": "securepassword123"
}
```

### Reports Endpoints

#### Attendance Report
```
GET /reports/attendance-report?class=10&startDate=2026-01-01&endDate=2026-01-31
```

#### Academic Report
```
GET /reports/academic-report?class=10
```

#### Dashboard
```
GET /reports/dashboard
```

---

## 🎨 Frontend Features

### Authentication
- Login page with JWT token storage
- Protected routes with ProtectedRoute component
- Automatic logout

### Dashboard
- Real-time KPIs (Students, Exams, Attendance)
- Class-wise breakdown
- Quick navigation

### Student Management
- Paginated student list
- Advanced form for creating/editing
- Detailed student profiles with tabs
- Soft delete functionality

### Attendance
- Bulk mark attendance by class & date
- Status tracking (Present/Absent/Leave)
- Historical records

### Grades
- Add grades by subject & exam
- Percentage calculation
- Average grade tracking
- Grade history

### Reports
- Attendance analytics by date range
- Academic performance report
- Comprehensive dashboard
- CSV export functionality

---

## 🏗️ Project Structure

```
CBM/
├── server/
│   ├── index.js                    # Main server
│   ├── models/
│   │   ├── Student.js              # Student schema
│   │   └── User.js                 # User schema
│   ├── routes/
│   │   ├── studentRoutes.js         # Student endpoints
│   │   ├── userRoutes.js            # User auth endpoints
│   │   └── reportRoutes.js          # Report endpoints
│   └── controllers/
│       └── studentController.js     # Business logic
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── StudentList.jsx
│   │   │   ├── StudentForm.jsx
│   │   │   ├── StudentDetail.jsx
│   │   │   ├── AttendanceTracker.jsx
│   │   │   ├── GradeManagement.jsx
│   │   │   └── Reports.jsx
│   │   ├── components/
│   │   │   ├── Layout.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── StatCard.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   └── App.jsx
│   └── package.json
├── package.json
└── .env.example
```

---

## 🔐 Authentication

### Default Demo Account
```
Email: admin@school.com
Password: password123
```

Create additional accounts via `/api/users/register`

---

## 📊 Database Schema

### Student Collection
```javascript
{
  rollNumber: String (unique),
  firstName: String,
  lastName: String,
  email: String (unique),
  phoneNumber: String,
  dateOfBirth: Date,
  class: String (10/11/12),
  section: String (A/B/C/D),
  gender: String,
  address: { street, city, state, postalCode },
  parentInfo: { fatherName, motherName, parentPhone, parentEmail },
  attendance: [{ date, status, remarksBy }],
  grades: [{ subject, exam, marks, percentage, grade, recordedDate }],
  isActive: Boolean,
  timestamps: { createdAt, updatedAt }
}
```

### User Collection
```javascript
{
  name: String,
  email: String (unique),
  password: String (bcrypt hashed),
  role: String (admin/teacher/staff),
  isActive: Boolean,
  lastLogin: Date,
  timestamps: { createdAt, updatedAt }
}
```

---

## 🧪 Testing

### Sample Data Creation
```bash
# Create student via API
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "rollNumber": "10A001",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@school.com",
    "class": "10",
    "section": "A"
  }'
```

---

## 📦 Dependencies

### Backend
- express: Web framework
- mongoose: MongoDB ODM
- bcryptjs: Password hashing
- jsonwebtoken: JWT auth
- cors: CORS middleware
- dotenv: Environment variables

### Frontend
- react: UI library
- react-router-dom: Routing
- axios: HTTP client
- tailwindcss: CSS framework
- vite: Build tool

---

## 🚨 Error Handling

All endpoints return standardized responses:

### Success
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## 🔄 Workflow Examples

### Add a New Student & Mark Attendance

1. **Create Student**
   ```
   POST /students
   ```

2. **Mark Attendance**
   ```
   POST /students/{studentId}/attendance
   ```

3. **View Attendance Report**
   ```
   GET /reports/attendance-report?class=10
   ```

### Record Grades & Generate Report

1. **Add Grade**
   ```
   POST /students/{studentId}/grades
   ```

2. **Get Report Card**
   ```
   GET /students/{studentId}/report-card
   ```

3. **Academic Report**
   ```
   GET /reports/academic-report?class=10
   ```

---

## 🌟 Key Features

✅ **Full CRUD Operations** - Manage student records completely  
✅ **Attendance Tracking** - Bulk mark & analytics  
✅ **Grade Management** - Track academic performance  
✅ **User Authentication** - Role-based access (Admin/Teacher/Staff)  
✅ **Advanced Analytics** - Comprehensive reporting & KPIs  
✅ **Responsive UI** - Works on desktop & mobile  
✅ **Data Export** - CSV reports  
✅ **Performance Optimized** - Pagination & indexing  

---

## 📝 License

MIT © 2026 KHINDevOf

---

## 👨‍💻 Support

For issues, feature requests, or contributions:
- Create an issue in GitHub
- Check the documentation
- Review the API endpoints

---

**Built with ❤️ by AshnaAI | Coolruntime Edition**
