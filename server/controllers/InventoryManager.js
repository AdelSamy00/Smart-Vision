import MaterialOrders from '../models/MaterialOrder.js';
import IventoryTransactions from '../models/inventoryTransaction.js';

export const getMaterialTransactions = async (req, res, next) => {
  try {
    const transactions = await IventoryTransactions.find({'category': 'Materials'})
      .populate({
        path: 'inventoryManager',
        select: '_id username email -password',
      })
      .populate({
        path: 'materials',
        populate: {
          path: 'material',
        },
      })

    if (!transactions || transactions.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No transactions found with category "materials"',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Transactions retrieved successfully',
      transactions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve transactions',
    });
  }
};

export const getProductTransactions = async (req, res, next) => {
  try {
    const transactions = await IventoryTransactions.find({'category': 'Products'})
      .populate({
        path: 'inventoryManager',
        select: '_id username email -password',
      })
      .populate({
        path: 'products',
        populate: {
          path: 'product',
        },
      });

    if (!transactions || transactions.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No transactions found with category "products"',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Transactions retrieved successfully',
      transactions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve transactions',
    });
  }
};

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

