import ServicesOrders from '../models/ServiceOrder.js';

export const getCustomizationOrdersDetails = async (req, res, next) => {
  try {
    const customizationOrdersDetails = await ServicesOrders.find({
      service: 'Customization Service',
      state: 'MANFACTURING',
    }).populate({
      path: 'customer',
      select: '-password',
    });
    res.status(200).json({
      success: true,
      message: 'get customization orders details successfully',
      customizationOrdersDetails,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
