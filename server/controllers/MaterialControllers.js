import Employees from '../models/Employee.js';
import Materials from '../models/Material.js';
import IventoryTransactions from '../models/inventoryTransaction.js';
export const addMaterial = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const newMaterial = await Materials.create({
      name,
      quantity,
    });

    res.status(201).json({
      success: true,
      message: 'Material added successfully',
      material: newMaterial,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to add material',
    });
  }
};

export const getMaterial = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Find the material by ID
    const material = await Materials.findById(id);

    if (!material) {
      return res
        .status(404)
        .json({ success: false, message: 'Material not found' });
    }

    res.status(200).json({ success: true, material });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteMaterial = async (req, res, next) => {
  try {
    const { id } = req.body;

    // Find the material by ID and delete it
    const deletedMaterial = await Materials.findByIdAndDelete(id);

    if (!deletedMaterial) {
      return res
        .status(404)
        .json({ success: false, message: 'Material not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Material deleted successfully',
      material: deletedMaterial,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateMaterial = async (req, res, next) => {
  try {
    const { id } = req.body;
    const { name, quantity } = req.body;

    // Find the material by ID and update its fields
    const updatedMaterial = await Materials.findByIdAndUpdate(
      id,
      { name, quantity },
      { new: true }
    );
    if (!updatedMaterial) {
      return res
        .status(404)
        .json({ success: false, message: 'Material not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Material updated successfully',
      material: updatedMaterial,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const existMaterials = async (id) => {
  try {
    const material = await Materials.findOne({ _id: id });
    return true;
  } catch (error) {
    return false;
  }
};

export const decreaseMaterialQuantity = async (id, quantity, next) => {
  try {
    // Find the material by ID
    const material = await Materials.findOne({ _id: id });
    // Check if the requested quantity to decrease is negative or exceeds the current quantity
    if (quantity <= 0 || quantity > material.quantity) {
      next('Sorry, not enough quantity available to decrease');
      return;
    }
    // Decrease the quantity by the specified amount
    material.quantity -= quantity;
    await material.save();
    /* res.status(200).json({
        success: true,
        message: 'Material quantity decreased successfully',
        material,
      }); */
  } catch (error) {
    console.log(error);
  }
};

export const increaseMaterialQuantity = async (id, quantity, next) => {
  try {
    // Find the material by ID
    const material = await Materials.findOne({ _id: id });
    // Increase the quantity by the specified amount
    material.quantity += quantity;
    await material.save();
    /* res.status(200).json({
        success: true,
        message: 'Material quantity decreased successfully',
        material,
      }); */
  } catch (error) {
    console.log(error);
  }
};

export const materialExport = async (req, res, next) => {
  try {
    let flag = true;
    const { managerId, exports, method } = req.body;
    if (!managerId || !exports.length || !method) {
      next('Provide Required Fields!');
      return;
    }
    // to make sure that products in cart elready exist
    await Promise.all(
      exports.map(async (material) => {
        const exist = await existMaterials(material.material);
        if (!exist) {
          flag = false;
        }
      })
    );
    if (flag) {
      exports.map(async (material) => {
        await decreaseMaterialQuantity(material.material, material.quantity);
      });
      //make transaction
      const transaction = await IventoryTransactions.create({
        inventoryManager: managerId,
        transaction: method,
        materials: exports,
      });
      res.status(200).json({
        success: true,
        message: 'the Export Transaction has been made successfully',
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'material is not found',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: 'failed to place this transaction',
    });
  }
};
