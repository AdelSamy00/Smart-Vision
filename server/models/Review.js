import mongoose, { Schema } from 'mongoose';
const reviewSchema = new mongoose.Schema(
  {
    customer: { type: Schema.Types.ObjectId, ref: 'Customers' },
    product: { type: Schema.Types.ObjectId, ref: 'Products' },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Reviews = mongoose.model('Reviews', reviewSchema);
export default Reviews;
