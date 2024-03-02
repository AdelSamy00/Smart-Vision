import mongoose, { Schema } from 'mongoose';
const serviceOrderSchema = new mongoose.Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'Customers',
    },
    state: { type: String, default: 'PENDING' },
    service: {
      type: String,
      required: [true, 'Service is Required!'],
    },
    description: {
      type: String,
      required: [true, 'Description is Required!'],
    },
    address: {
      type: String,
    },
    phone: { type: Number },
    images: [{ type: String }],
    data: {
      type: String,
    },
    price: { type: Number },
    cancelServiceOrderExpiresAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const ServicesOrders = mongoose.model('ServicesOrders', serviceOrderSchema);
export default ServicesOrders;
