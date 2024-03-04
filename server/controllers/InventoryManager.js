import MaterialOrders from '../models/MaterialOrder.js';
import IventoryTransactions from '../models/inventoryTransaction.js';

export const getMaterialTransactions = async (req, res, next) => {};

export const getProductTransactions = async (req, res, next) => {};

export const getMaterialOrders = async (req, res, next) => {
  try {
    const materialOrders = await MaterialOrders.find({}).populate([
      {
        path: 'engineer',
        select: '_id username email -password',
      },
      {
        path: 'service',
        select: '',
      },
    ]);
    res.status(200).json({
      success: true,
      message: 'get customization orders successfully',
      materialOrders,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
