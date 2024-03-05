import mongoose, { Schema } from 'mongoose';
const inventoryTransactionSchema = new mongoose.Schema(
  {
    inventoryManager: {
      type: Schema.Types.ObjectId,
      ref: 'Employees',
    },
    transaction: {
      type: String,
    },
    category: { type: String },
    materials: [
      {
        quantity: { type: Number },
        material: {
          type: Schema.Types.ObjectId,
          ref: 'Materials',
        },
      },
    ],
    products: [
      {
        quantity: { type: Number },
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Products',
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const IventoryTransactions = mongoose.model(
  'IventoryTransactions',
  inventoryTransactionSchema
);
export default IventoryTransactions;
