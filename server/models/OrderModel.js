import mongoose, { Schema } from 'mongoose';
const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'Customers',
    },
    order: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Products',
        },
        quantity: { type: Number },
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
