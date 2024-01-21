import mongoose from 'mongoose';
const customerSchema = new mongoose.Schema(
  {
    userName: {
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
    gander: { type: String },
    address: { type: String },
    phone: { type: Number, unique: true },
    points: { type: Number, default: 0 },
    orderHistory: [{ type: Schema.Types.ObjectId, ref: 'Orders' }],
    serviceHistory: [{ type: Schema.Types.ObjectId, ref: 'Services' }],
    customizedHistory: [
      { type: Schema.Types.ObjectId, ref: 'CustomizedOrders' },
    ],
    verified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Customers = mongoose.model('Customers', customerSchema);
export default Customers;
