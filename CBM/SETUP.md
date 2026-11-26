# CBM - 30 Frame Full-Stack Prototype

## 📖 Quick Setup Guide

### Step 1: Install Dependencies
```bash
npm install
cd client && npm install && cd ..
```

### Step 2: Setup Environment
```bash
# Copy environment template
cp .env.example .env

# Update with your MongoDB URI
# MONGODB_URI=mongodb://localhost:27017/cbm-students
```

### Step 3: Start MongoDB
```bash
# Using local MongoDB
mongod

# Or use MongoDB Atlas (update MONGODB_URI in .env)
```

### Step 4: Run Backend (Terminal 1)
```bash
npm run dev
# Backend: http://localhost:5000
# Health Check: http://localhost:5000/api/health
```

### Step 5: Run Frontend (Terminal 2)
```bash
npm run client
# Frontend: http://localhost:5173
```

### Step 6: Login
```
Email: admin@school.com
Password: password123
```

---

## 📚 System Architecture (30 Frames)

### Backend API Frames (20 Frames)

**Student Management (Frames 1-13)**
1. Create Student
2. Get All Students (Paginated)
3. Get Student by ID
4. Update Student
5. Delete Student (Soft Delete)
6. Search by Class/Section
7. Search by Roll Number
8. Mark Attendance
9. Get Attendance Record
10. Add Grade
11. Get Grades
12. Get Report Card
13. Class Statistics

**Authentication & Users (Frames 14-17)**
14. User Registration
15. User Login
16. Get All Users
17. Get User by ID

**Reports & Analytics (Frames 18-20)**
18. Attendance Report
19. Academic Report
20. Dashboard Analytics

### Frontend Pages (10 Frames)

**Core Pages (Frames 21-30)**
21. App Router Configuration
22. API Service Layer
23. Dashboard Page
24. Student List
25. Student Form (Create/Edit)
26. Student Detail (Tabbed View)
27. Attendance Tracker
28. Grade Management
29. Reports & Export
30. Login Page

---

## 🔗 API Endpoints Summary

### Students
- `POST /students` - Create
- `GET /students` - List (paginated)
- `GET /students/:id` - Get one
- `PUT /students/:id` - Update
- `DELETE /students/:id` - Delete
- `GET /students/search/by-class` - Search by class
- `GET /students/search/by-rollnumber/:rollNumber` - Search by roll
- `POST /students/:id/attendance` - Mark attendance
- `GET /students/:id/attendance` - Get attendance
- `POST /students/:id/grades` - Add grade
- `GET /students/:id/grades` - Get grades
- `GET /students/:id/report-card` - Report card
- `GET /students/analytics/class-statistics` - Class stats

### Users
- `POST /users/register` - Register
- `POST /users/login` - Login
- `GET /users` - List users
- `GET /users/:id` - Get user

### Reports
- `GET /reports/attendance-report` - Attendance report
- `GET /reports/academic-report` - Academic report
- `GET /reports/dashboard` - Dashboard data

---

## 🗄️ Database Collections

### Students (Flexible Schema)
```
{
  rollNumber, firstName, lastName, email, phoneNumber,
  dateOfBirth, class, section, gender,
  address: { street, city, state, postalCode },
  parentInfo: { fatherName, motherName, parentPhone, parentEmail },
  attendance: [{ date, status, remarksBy }],
  grades: [{ subject, exam, marks, outOf, percentage, grade }],
  isActive, createdBy, updatedBy, timestamps
}
```

### Users
```
{
  name, email, password (hashed), role (admin/teacher/staff),
  department, isActive, lastLogin, timestamps
}
```

---

## 🎯 UI/UX Features

✅ Responsive Design (Tailwind CSS)  
✅ Dark Sidebar Navigation  
✅ Tabbed Interfaces  
✅ Pagination Controls  
✅ Form Validation  
✅ Loading States  
✅ Error Handling  
✅ CSV Export  
✅ Date Pickers  
✅ Status Badges  

---

## 🛠️ Development Commands

```bash
# Start backend
npm run dev

# Start frontend
npm run client

# Build frontend
npm run build

# Run tests
npm test

# Lint code
npm run lint
```

---

## 📊 Sample API Calls (cURL)

### Create Student
```bash
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "rollNumber": "10A001",
    "firstName": "Rajesh",
    "lastName": "Kumar",
    "email": "rajesh@example.com",
    "class": "10",
    "section": "A"
  }'
```

### Mark Attendance
```bash
curl -X POST http://localhost:5000/api/students/{studentId}/attendance \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {token}" \
  -d '{
    "date": "2026-01-26",
    "status": "Present"
  }'
```

### Get Dashboard
```bash
curl -X GET http://localhost:5000/api/reports/dashboard \
  -H "Authorization: Bearer {token}"
```

---

## 🔐 Security Features

✅ JWT Token Authentication  
✅ Bcrypt Password Hashing  
✅ Protected Routes  
✅ CORS Enabled  
✅ Input Validation  
✅ Error Logging  

---

## 📱 Browser Support

- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)

---

## 🚀 Deployment

### Backend (Heroku/Render)
```bash
1. Set environment variables
2. Deploy with git
3. Connect MongoDB Atlas
```

### Frontend (Vercel/Netlify)
```bash
1. Build: npm run build
2. Deploy dist folder
3. Set API_BASE_URL
```

---

**CBM v1.0.0** | 30-Frame Full-Stack Prototype | 2026
