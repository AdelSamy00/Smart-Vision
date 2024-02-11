import ContactUs from '../models/ContactUs.js';
import Customers from '../models/CustomerModel.js';
import Verifications from '../models/EmailVerification.js';
import Orders from '../models/OrderModel.js';
import Products from '../models/ProductModel.js';

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
      message: 'failed to cancel this order',
    });
  }
};
