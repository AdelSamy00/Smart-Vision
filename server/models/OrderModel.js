import mongoose, { Schema } from 'mongoose';
const orderSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    phoneNumber: { type: Number },
    city: { type: String },
    country: { type: String },
    address: { type: String },
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'Customers',
    },
    products: [
      {
        quantity: { type: Number },
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Products',
        },
      },
    ],
    totalPrice: { type: Number },
    totalPoints: { type: Number },
    state: { type: String, default: 'PENDING' },
    cancelOrderExpiresAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Orders = mongoose.model('Orders', orderSchema);
export default Orders;
