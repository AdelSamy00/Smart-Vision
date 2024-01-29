import mongoose, { Schema } from 'mongoose';
const contactUsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is Required!'],
    },
    email: {
      type: String,
      required: [true, 'Email is Required!'],
    },
    message: {
      type: String,
      required: [true, 'Message is Required!'],
    },
    picture: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const ContactUs = mongoose.model('ContactUs', contactUsSchema);
export default ContactUs;
