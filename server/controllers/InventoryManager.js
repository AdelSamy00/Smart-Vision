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



export const getAllTransactions = async (req, res, next) => {
  try {
    const transactions = await IventoryTransactions.find().populate([
      {
        path: 'inventoryManager',
        select: '_id username email -password',
      },
      {
        path:'materials',
        populate:{
          path:'material'
        },
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
      message: 'Transactions retrieved successfully',
      transactions: transactions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve transactions',
    });
  }
};

