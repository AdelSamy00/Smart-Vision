import Products from '../models/ProductModel.js';

export const getShowProducts = async (req, res, next) => {
  try {
    const products = await Products.find({ show: true }).populate({
      path: 'reviews',
      populate: {
        path: 'customer',
        select: 'username email -password',
      },
    });
    res.status(200).json({
      success: true,
      message: 'get products successfully',
      products,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addToStore = async (req, res, next) => {
  try {
    const productData = req.body;
    // validation
    if (!productData.name || !productData.quantity || !productData.images) {
      next('Please Provide needed fields');
      return;
    }
    const product = await Products.findByIdAndUpdate(
      { _id: productData._id },
      { ...productData },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: 'add product successfully to store',
      product,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addProduct = async (req, res, next) => {
  try {
    const productData = req.body;
    // validation
    if (
      !productData.name ||
      !productData.quantity ||
      !productData.description ||
      !productData.category
    ) {
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
    const product = await Products.findOne({ _id: id }).populate({
      path: 'reviews',
      populate: {
        path: 'customer',
        select: 'username email -password',
      },
    });
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

// this funcation will help us to khow if the product exist or not
//to help us in funcation makeOrder in customerControllers
export const existProduct = async (id) => {
  try {
    const product = await Products.findOne({ _id: id });
    return true;
  } catch (error) {
    return false;
  }
};
// this funcation will help us to decrese quantity
//to help us in funcation makeOrder in customerControllers
export const decreseQuantity = async (id, quantity) => {
  try {
    const product = await Products.findById({ _id: id });
    product.quantity -= quantity;
    const updatedpProduct = await Products.findByIdAndUpdate(
      { _id: id },
      product,
      { new: true }
    );
  } catch (error) {
    console.log(error);
  }
};
// this funcation will help us to decrese quantity
//to help us in funcation cancelOrder in customerControllers
export const increaseQuantity = async (id, quantity) => {
  try {
    const product = await Products.findById({ _id: id });
    product.quantity += quantity;
    const updatedpProduct = await Products.findByIdAndUpdate(
      { _id: id },
      product,
      { new: true }
    );
  } catch (error) {
    console.log(error);
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

// this funcation will help us to calculate total Rating
//to help us in funcation deleteReview in customerControllers
export const calculateTotalRating = async (productReviews) => {
  let total = 0;
  productReviews.map((review) => {
    total = total + review.rating;
  });

  return total / productReviews.length;
};

export const getNotShownProducts = async (req, res, next) => {
  try {
    const products = await Products.find({ show: false });
    res.status(200).json({
      success: true,
      message: 'get products successfully',
      products,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// this funcation will help us to Update Product Details when product in inverntory
export const updateProductDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, quantity, category, colors } = req.body;
    if (!name || !quantity || !description || !category || !colors.length) {
      next('Please Provide needed fields');
      return;
    }
    const product = await Products.findByIdAndUpdate(
      { _id: id },
      { name, description, quantity, category, colors },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: 'update product details successfully',
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
