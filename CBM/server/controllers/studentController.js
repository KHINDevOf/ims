import Student from '../models/Student.js';

class StudentController {
  // Frame 1: Create Student
  static async createStudent(req, res) {
    try {
      const student = new Student(req.body);
      await student.save();
      res.status(201).json({ success: true, data: student, message: 'Student created successfully' });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // Frame 2: Get All Students
  static async getAllStudents(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const students = await Student.find({ isActive: true })
        .skip(skip)
        .limit(limit)
        .sort({ rollNumber: 1 });

      const total = await Student.countDocuments({ isActive: true });

      res.status(200).json({
        success: true,
        data: students,
        pagination: { page, limit, total, pages: Math.ceil(total / limit) }
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Frame 3: Get Student By ID
  static async getStudentById(req, res) {
    try {
      const student = await Student.findById(req.params.id);
      if (!student) return res.status(404).json({ success: false, message: 'Student not found' });
      res.status(200).json({ success: true, data: student });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Frame 4: Update Student
  static async updateStudent(req, res) {
    try {
      const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!student) return res.status(404).json({ success: false, message: 'Student not found' });
      res.status(200).json({ success: true, data: student, message: 'Student updated successfully' });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // Frame 5: Delete Student (Soft Delete)
  static async deleteStudent(req, res) {
    try {
      const student = await Student.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
      if (!student) return res.status(404).json({ success: false, message: 'Student not found' });
      res.status(200).json({ success: true, message: 'Student deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Frame 6: Search By Class
  static async searchByClass(req, res) {
    try {
      const { class: studentClass, section } = req.query;
      const query = { isActive: true, class: studentClass };
      if (section) query.section = section;

      const students = await Student.find(query).sort({ rollNumber: 1 });
      res.status(200).json({ success: true, data: students, count: students.length });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Frame 7: Search By Roll Number
  static async searchByRollNumber(req, res) {
    try {
      const student = await Student.findOne({ rollNumber: req.params.rollNumber, isActive: true });
      if (!student) return res.status(404).json({ success: false, message: 'Student not found' });
      res.status(200).json({ success: true, data: student });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Frame 8: Add Attendance
  static async addAttendance(req, res) {
    try {
      const { date, status, remarksBy } = req.body;
      const student = await Student.findByIdAndUpdate(
        req.params.id,
        { $push: { attendance: { date, status, remarksBy } } },
        { new: true, runValidators: true }
      );
      if (!student) return res.status(404).json({ success: false, message: 'Student not found' });
      res.status(201).json({ success: true, data: student, message: 'Attendance marked' });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // Frame 9: Get Attendance
  static async getAttendance(req, res) {
    try {
      const student = await Student.findById(req.params.id).select('attendance rollNumber fullName');
      if (!student) return res.status(404).json({ success: false, message: 'Student not found' });
      
      const totalDays = student.attendance.length;
      const presentDays = student.attendance.filter(a => a.status === 'Present').length;
      const percentage = totalDays > 0 ? (presentDays / totalDays) * 100 : 0;

      res.status(200).json({
        success: true,
        data: {
          student: { rollNumber: student.rollNumber, name: student.fullName },
          attendance: student.attendance,
          stats: { totalDays, presentDays, percentage: percentage.toFixed(2) }
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Frame 10: Add Grade
  static async addGrade(req, res) {
    try {
      const { subject, exam, marks, outOf, grade } = req.body;
      const percentage = outOf ? (marks / outOf) * 100 : (marks / 100) * 100;

      const student = await Student.findByIdAndUpdate(
        req.params.id,
        { $push: { grades: { subject, exam, marks, outOf, percentage, grade, recordedDate: new Date() } } },
        { new: true }
      );
      if (!student) return res.status(404).json({ success: false, message: 'Student not found' });
      res.status(201).json({ success: true, data: student, message: 'Grade added successfully' });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // Frame 11: Get Grades
  static async getGrades(req, res) {
    try {
      const student = await Student.findById(req.params.id).select('grades rollNumber fullName');
      if (!student) return res.status(404).json({ success: false, message: 'Student not found' });

      const avgPercentage = student.grades.length > 0
        ? (student.grades.reduce((sum, g) => sum + g.percentage, 0) / student.grades.length).toFixed(2)
        : 0;

      res.status(200).json({
        success: true,
        data: {
          student: { rollNumber: student.rollNumber, name: student.fullName },
          grades: student.grades,
          average: avgPercentage
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Frame 12: Get Report Card
  static async getReportCard(req, res) {
    try {
      const student = await Student.findById(req.params.id);
      if (!student) return res.status(404).json({ success: false, message: 'Student not found' });

      const attendance = student.attendance;
      const presentDays = attendance.filter(a => a.status === 'Present').length;
      const attendancePercentage = attendance.length > 0 ? (presentDays / attendance.length * 100).toFixed(2) : 0;

      const avgGrade = student.grades.length > 0
        ? (student.grades.reduce((sum, g) => sum + g.percentage, 0) / student.grades.length).toFixed(2)
        : 0;

      res.status(200).json({
        success: true,
        data: {
          student: {
            name: student.fullName,
            rollNumber: student.rollNumber,
            class: student.class,
            section: student.section
          },
          academics: { avgPercentage: avgGrade, totalExams: student.grades.length },
          attendance: { percentage: attendancePercentage, presentDays, totalDays: attendance.length },
          remarks: 'Generated by CBM System'
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Frame 13: Class Statistics
  static async getClassStatistics(req, res) {
    try {
      const { class: studentClass, section } = req.query;
      const query = { isActive: true, class: studentClass };
      if (section) query.section = section;

      const students = await Student.find(query);
      const totalStudents = students.length;
      const avgAttendance = students.length > 0
        ? (students.reduce((sum, s) => {
            const att = s.attendance.length > 0 ? (s.attendance.filter(a => a.status === 'Present').length / s.attendance.length) * 100 : 0;
            return sum + att;
          }, 0) / totalStudents).toFixed(2)
        : 0;

      res.status(200).json({
        success: true,
        data: {
          class: studentClass,
          section: section || 'All',
          totalStudents,
          avgAttendance,
          studentList: students.map(s => ({ name: s.fullName, rollNumber: s.rollNumber }))
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default StudentController;
