import Products from '../models/ProductModel.js';

export const getProducts = async (req, res, next) => {
  try {
    const products = await Products.find({});
    res.status(200).json({
      success: true,
      message: 'get products successfully',
      products,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addProduct = async (req, res, next) => {
  try {
    const productData = req.body;
    // validation
    if (!productData.name || !productData.quantity || !productData.images) {
      next('Please Provide needed fields');
      return;
    }
    const product = await Products.create({ ...productData });
    res.status(200).json({
      success: true,
      message: 'add product successfully',
      product,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Products.findOne({ _id: id });
    res.status(200).json({
      success: true,
      message: 'get products successfully',
      product,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'not found',
    });
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, quantity, category, price, points } = req.body;
    const productData = req.body;
    if (!name || !quantity || !description || !category || !price || !points) {
      next('Please Provide needed fields');
      return;
    }
    const product = await Products.findByIdAndUpdate(
      { _id: id },
      { ...productData },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: 'get products successfully',
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: 'failed to update',
    });
  }
};
