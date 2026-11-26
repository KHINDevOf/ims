import express from 'express';
import StudentController from '../controllers/studentController.js';

const router = express.Router();

// CRUD Operations
router.post('/', StudentController.createStudent);              // Frame 1
router.get('/', StudentController.getAllStudents);            // Frame 2
router.get('/:id', StudentController.getStudentById);         // Frame 3
router.put('/:id', StudentController.updateStudent);          // Frame 4
router.delete('/:id', StudentController.deleteStudent);       // Frame 5

// Search & Filter
router.get('/search/by-class', StudentController.searchByClass); // Frame 6
router.get('/search/by-rollnumber/:rollNumber', StudentController.searchByRollNumber); // Frame 7

// Attendance
router.post('/:id/attendance', StudentController.addAttendance); // Frame 8
router.get('/:id/attendance', StudentController.getAttendance);  // Frame 9

// Grades
router.post('/:id/grades', StudentController.addGrade);        // Frame 10
router.get('/:id/grades', StudentController.getGrades);        // Frame 11

// Analytics
router.get('/:id/report-card', StudentController.getReportCard); // Frame 12
router.get('/analytics/class-statistics', StudentController.getClassStatistics); // Frame 13

export default router;
