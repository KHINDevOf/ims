import express from 'express';
import Student from '../models/Student.js';

const router = express.Router();

// Frame 18: Generate Attendance Report
router.get('/attendance-report', async (req, res) => {
  try {
    const { class: studentClass, startDate, endDate } = req.query;
    const query = { isActive: true };
    if (studentClass) query.class = studentClass;

    const students = await Student.find(query);
    const reportData = students.map(s => {
      const relevantAttendance = s.attendance.filter(a => {
        if (startDate && endDate) {
          return new Date(a.date) >= new Date(startDate) && new Date(a.date) <= new Date(endDate);
        }
        return true;
      });

      const presentDays = relevantAttendance.filter(a => a.status === 'Present').length;
      const percentage = relevantAttendance.length > 0 ? (presentDays / relevantAttendance.length * 100).toFixed(2) : 0;

      return {
        name: s.fullName,
        rollNumber: s.rollNumber,
        totalDays: relevantAttendance.length,
        presentDays,
        percentage
      };
    });

    res.status(200).json({
      success: true,
      class: studentClass || 'All',
      period: { startDate, endDate },
      report: reportData,
      generatedAt: new Date()
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Frame 19: Academic Performance Report
router.get('/academic-report', async (req, res) => {
  try {
    const { class: studentClass } = req.query;
    const query = { isActive: true };
    if (studentClass) query.class = studentClass;

    const students = await Student.find(query);
    const reportData = students.map(s => {
      const avgPercentage = s.grades.length > 0
        ? (s.grades.reduce((sum, g) => sum + g.percentage, 0) / s.grades.length).toFixed(2)
        : 'N/A';

      const topSubject = s.grades.length > 0
        ? s.grades.reduce((max, g) => g.percentage > max.percentage ? g : max).subject
        : 'N/A';

      return {
        name: s.fullName,
        rollNumber: s.rollNumber,
        averagePercentage: avgPercentage,
        examsTaken: s.grades.length,
        topSubject
      };
    });

    res.status(200).json({
      success: true,
      class: studentClass || 'All',
      report: reportData,
      generatedAt: new Date()
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Frame 20: Comprehensive Dashboard
router.get('/dashboard', async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments({ isActive: true });
    const classCounts = await Student.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$class', count: { $sum: 1 } } }
    ]);

    const allStudents = await Student.find({ isActive: true });
    const totalExams = allStudents.reduce((sum, s) => sum + s.grades.length, 0);
    const avgAttendance = allStudents.length > 0
      ? (allStudents.reduce((sum, s) => {
          const att = s.attendance.length > 0
            ? (s.attendance.filter(a => a.status === 'Present').length / s.attendance.length) * 100
            : 0;
          return sum + att;
        }, 0) / allStudents.length).toFixed(2)
      : 0;

    res.status(200).json({
      success: true,
      dashboard: {
        totalStudents,
        totalExams,
        avgAttendance,
        classBreakdown: classCounts.map(c => ({ class: c._id, count: c.count }))
      },
      generatedAt: new Date()
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
