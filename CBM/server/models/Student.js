import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    rollNumber: {
      type: String,
      unique: true,
      required: [true, 'Roll number is required'],
      trim: true,
      uppercase: true
    },
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email format']
    },
    phoneNumber: {
      type: String,
      match: [/^[0-9]{10}$/, 'Phone number must be 10 digits']
    },
    dateOfBirth: {
      type: Date
    },
    class: {
      type: String,
      enum: ['10', '11', '12'],
      required: [true, 'Class is required']
    },
    section: {
      type: String,
      enum: ['A', 'B', 'C', 'D'],
      default: 'A'
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other']
    },
    address: {
      street: String,
      city: String,
      state: String,
      postalCode: String
    },
    parentInfo: {
      fatherName: String,
      motherName: String,
      parentPhone: String,
      parentEmail: String
    },
    attendance: [
      {
        date: Date,
        status: { type: String, enum: ['Present', 'Absent', 'Leave'] },
        remarksBy: String
      }
    ],
    grades: [
      {
        subject: String,
        exam: String,
        marks: Number,
        outOf: { type: Number, default: 100 },
        percentage: Number,
        grade: String,
        recordedDate: { type: Date, default: Date.now }
      }
    ],
    documents: [
      {
        type: String,
        fileUrl: String,
        uploadedDate: { type: Date, default: Date.now }
      }
    ],
    isActive: {
      type: Boolean,
      default: true
    },
    createdBy: mongoose.Schema.Types.ObjectId,
    updatedBy: mongoose.Schema.Types.ObjectId
  },
  { timestamps: true }
);

// Virtual for full name
studentSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Index for performance
studentSchema.index({ rollNumber: 1, class: 1 });
studentSchema.index({ email: 1 });

export default mongoose.model('Student', studentSchema);
