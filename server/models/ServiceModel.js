import mongoose from 'mongoose';
const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is Required!'],
  },
  description: {
    type: String,
  },
  img_url: {
    type: String,
  },
});

const Services = mongoose.model('Services', serviceSchema);
export default Services;
