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

export const getTransaction = async (req, res, next) => {
  try {
    const { transactionId } = req.params;
    const transaction = await IventoryTransactions.findById(transactionId).populate([
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

    ])

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Transaction retrieved successfully',
      transaction: transaction,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve transaction',
    });
  }
};
