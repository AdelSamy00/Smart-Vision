import ContactUs from '../models/ContactUs.js';
import Customers from '../models/CustomerModel.js';
import Verifications from '../models/EmailVerification.js';
import Orders from '../models/OrderModel.js';
import Products from '../models/ProductModel.js';
import Reviews from '../models/Review.js';
import ServicesOrders from '../models/ServiceOrder.js';

export const getAllCustomers = async (req, res, next) => {
  const customers = await Customers.find({}).select('-password');
  res.status(200).json({
    success: true,
    message: 'get data successfully',
    customers,
  });
};

export const updateOrderState = async (req, res, next) => {
  try {
    const { orderId, state } = req.body;
    if (!state || !orderId) {
      next('Provide Required Fields!');
      return;
    }
    const order = await Orders.findByIdAndUpdate(
      { _id: orderId },
      { state: state },
      {
        new: true,
      }
    );
    res.status(200).json({
      success: true,
      message: 'update state order successfully',
      order: order,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'failed to update this order',
    });
  }
};

export const updateServiceOrderState = async (req, res, next) => {
  try {
    const { serviceId, state } = req.body;
    if (!state || !serviceId) {
      next('Provide Required Fields!');
      return;
    }
    const serviceOrder = await ServicesOrders.findByIdAndUpdate(
      { _id: serviceId },
      { state: state },
      {
        new: true,
      }
    );
    res.status(200).json({
      success: true,
      message: 'update state order successfully',
      serviceOrder: serviceOrder,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'failed to update this order',
    });
  }
};

export const deleteReview = async (req, res, next) => {
  try {
    const { customerId, reviewId, productId } = req.body;
    console.log(customerId, reviewId, productId);
    const review = await Reviews.findById({ _id: reviewId });
    const product = await Products.findById({ _id: productId }).populate(
      'reviews'
    );
    if (String(review.customer) === customerId) {
      //delete review from product
      product.reviews = product.reviews.filter(
        (pid) => String(pid._id) !== String(review._id)
      );
      //Calculate totalRating
      product.totalRating = await calculateTotalRating(product.reviews);
      const newProductData = await Products.findByIdAndUpdate(
        { _id: productId },
        product,
        {
          new: true,
        }
      );
      const deletedReview = await Reviews.findOneAndDelete({ _id: reviewId });
      res.status(200).json({
        success: true,
        message: 'Review deleted successfully',
        deletedReview,
        newProductData: newProductData,
        totalRating: product.totalRating,
      });
    } else {
      next('you are unauthorized to remove this review');
      return;
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'failed to delete review',
    });
  }
};

export const getCustomizationOrders = async (req, res, next) => {
  try {
    const customizationOrders = await ServicesOrders.find({
      service: 'Customization Service',
    }).populate({
      path: 'customer',
      select: '-password',
    });
    res.status(200).json({
      success: true,
      message: 'get customization orders successfully',
      customizationOrders,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const assignedEnginerToCustomizationServices = async (
  req,
  res,
  next
) => {
  try {
    const { engineerId, serviceId } = req.body;
    const service = await ServicesOrders.findByIdAndUpdate(
      { _id: serviceId },
      { assignedEngineer: engineerId },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: 'assignd engineer to order successfully',
      service: service,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
