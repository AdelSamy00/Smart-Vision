import mongoose, { Schema } from 'mongoose';
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is Required!'],
    },
    description: {
      type: String,
    },
    quantity: {
      type: Number,
      required: [true, 'quantity is Required!'],
    },
    category: { type: String },
    price: { type: Number, required: [true, 'Product price is Required!'] },
    images: [{ type: String }],
    likes: [{ type: String }],
    points: { type: Number, default: 200 },
    views: [{ type: String }],
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Reviews' }],
    show: { type: Boolean },
    colors: [{ type: String }],
    totalRating: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Products = mongoose.model('Products', productSchema);
export default Products;
