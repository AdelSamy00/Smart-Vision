import mongoose, { Schema } from 'mongoose';
const serviceOrderSchema = new mongoose.Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'Customers',
    },
    state: { type: String, default: 'PENDING' },
    /* serviceID: {
      type: Schema.Types.ObjectId,
      ref: 'Services',
    }, */
    service: {
      type: String,
      required: [true, 'Service is Required!'],
    },
    description: {
      type: String,
      required: [true, 'Description is Required!'],
    },
    images: [{ type: String }],
    cancelServiceOrderExpiresAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const ServicesOrders = mongoose.model('ServicesOrders', serviceOrderSchema);
export default ServicesOrders;
