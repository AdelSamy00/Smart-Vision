import mongoose from 'mongoose';
const serviceOrderSchema = new mongoose.Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'Customers',
    },
    state: { type: String },
    serviceID: {
      type: Schema.Types.ObjectId,
      ref: 'Services',
    },
  },
  {
    timestamps: true,
  }
);

const ServicesOrders = mongoose.model('ServicesOrders', serviceOrderSchema);
export default ServicesOrders;
