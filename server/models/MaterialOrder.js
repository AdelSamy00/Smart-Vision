import mongoose, { Schema } from 'mongoose';
const materialOrderSchema = new mongoose.Schema(
  {
    engineer: {
      type: Schema.Types.ObjectId,
      ref: 'Employees',
    },
    service: {
      type: Schema.Types.ObjectId,
      ref: 'ServicesOrders',
    },
    materials: [
      {
        quantity: { type: Number },
        material: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const MaterialOrders = mongoose.model('MaterialOrders', materialOrderSchema);
export default MaterialOrders;
