import mongoose from 'mongoose';
const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'Customers',
    },
    order: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Products',
        },
        quantity: { type: Number },
      },
    ],
    totalPrice: { type: Number },
    state: { type: String },
  },
  {
    timestamps: true,
  }
);

const Orders = mongoose.model('Orders', orderSchema);
export default Orders;