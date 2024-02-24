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
    price: { type: Number },
    images: [{ type: String }],
    likes: [{ type: String }],
    points: { type: Number },
    views: [{ type: String }],
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Reviews' }],
    show: { type: Boolean, default: false },
    colors: [{ type: String }],
    totalRating: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

/* required: [true, 'Product price is Required!'] */
/*  default: 200  */
const Products = mongoose.model('Products', productSchema);
export default Products;
