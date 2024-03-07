import Orders from "../models/OrderModel.js";
export const getAllOrders = async (req, res, next) => {
    try {
      const orders = await Orders.find().populate([
        {
            path: 'customer',
            select: '_id username email -password',
          },
          {
            path:'products',
            populate:{
              path:'product'
            },
          }
      ]);
  
      res.status(200).json({
        success: true,
        message: 'Orders retrieved successfully',
        orders: orders,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve orders',
      });
    }
  };

  export const getOrderById = async (req, res, next) => {
    try {
      const orderId = req.params.orderId; 
  
      // Find the order by ID and populate customer and products
      const order = await Orders.findById(orderId).populate([
        {
          path: 'customer',
          select: '_id username email -password',
        },
        {
          path: 'products',
          populate: {
            path: 'product',
          },
        },
      ]);
  
      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found',
        });
      }
  
      res.status(200).json({
        success: true,
        message: 'Order retrieved successfully',
        order: order,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve the order',
      });
    }
  };

  export const updateOrderStatus = async (req, res, next) => {
    try {
      const orderId = req.body.orderId; // Assuming the order ID is passed in the request parameters
      const { newStatus } = req.body; // Assuming the new status is passed in the request body
  
      // Find the order by ID
      const order = await Orders.findById(orderId);
  
      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found',
        });
      }
  
      // Update the status
      order.state = newStatus;
      await order.save();
  
      res.status(200).json({
        success: true,
        message: 'Order status updated successfully',
        order: order,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Failed to update order status',
      });
    }
  };