import mongoose, { Schema } from 'mongoose';
const employeeSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'userName is Required!'],
    },
    email: {
      type: String,
      required: [true, 'Email is Required!'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is Required!'],
      minlength: [6, 'Password length should be greater than 6 character'],
      select: true,
    },
    jobTitle: { type: String, required: [true, 'jobTitle is Required!'] },
    verified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Employees = mongoose.model('Employees', employeeSchema);
export default Employees;
