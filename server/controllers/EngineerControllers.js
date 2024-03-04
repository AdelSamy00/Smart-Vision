import Employees from '../models/Employee.js';
import MaterialOrders from '../models/MaterialOrder.js';
import ServicesOrders from '../models/ServiceOrder.js';
export const getAssignedCustomizationOrders = async (req, res, next) => {
  try {
    const { id } = req.params;
    const assignedOrders = await ServicesOrders.find({
      service: 'Customization Service',
      assignedEngineer: id,
    }).populate([
      {
        path: 'customer',
        select: 'username phone email address -password',
      },
      {
        path: 'assignedEngineer',
        select: '_id username email -password',
      },
    ]);
    res.status(200).json({
      success: true,
      message: 'get customization orders successfully',
      customizationOrders: assignedOrders,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCustomizationOrdersById = async (req, res, next) => {
  try {
    const { serviceId } = req.params;
    const order = await ServicesOrders.findById({
      _id: serviceId,
    }).populate([
      {
        path: 'customer',
        select: 'username phone email address -password',
      },
      {
        path: 'assignedEngineer',
        select: '_id username email -password',
      },
    ]);
    res.status(200).json({
      success: true,
      message: 'get customization orders successfully',
      customizationOrder: order,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const sendCustomizationDetails = async (req, res, next) => {
  try {
    const { serviceId, engineerId, materials, details } = req.body;
    const service = await ServicesOrders.findById({ _id: serviceId });
    const engineer = await Employees.findById({ _id: engineerId });
    service.details = details;
    service.state = 'MANFACTURING';
    service.save();
    const materialOrder = await MaterialOrders.create({
      engineer: engineerId,
      service: serviceId,
      materials: materials,
    });
    res.status(200).json({
      success: true,
      message: 'send material orders and details successfully',
      materialOrder: materialOrder,
      service: service,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
