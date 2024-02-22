import Materials from '../models/Material.js'
export const addMaterial = async (req, res, next) => {
    try {
      const { name, quantity } = req.body;
      const newMaterial = await Materials.create({
        name,
        quantity
      });
  
      res.status(201).json({
        success: true,
        message: 'Material added successfully',
        material: newMaterial
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Failed to add material'
      });
    }
  };

  export const getMaterial = async (req, res, next) => {
    try {
      const { id } = req.params; 
  
      // Find the material by ID
      const material = await Materials.findById(id);
  
      if (!material) {
        return res.status(404).json({ success: false, message: 'Material not found' });
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
        return res.status(404).json({ success: false, message: 'Material not found' });
      }
  
      res.status(200).json({ success: true, message: 'Material deleted successfully', material: deletedMaterial });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  export const updateMaterial = async (req, res, next) => {
    try {
      const { id } = req.body;
      const { name, quantity } = req.body;
  
      // Find the material by ID and update its fields
      const updatedMaterial = await Materials.findByIdAndUpdate(id, { name, quantity }, { new: true });
  
      if (!updatedMaterial) {
        return res.status(404).json({ success: false, message: 'Material not found' });
      }
  
      res.status(200).json({ success: true, message: 'Material updated successfully', material: updatedMaterial });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  /* export const decreaseMaterialQuantity = async (req, res, next) => {
    try {
      const { id, quantity } = req.body;
  
      // Find the material by ID
      const material = await Materials.findById(id);
  
      if (!material) {
        return res.status(404).json({ success: false, message: 'Material not found' });
      }
  
      // Check if the requested quantity to decrease is negative or exceeds the current quantity
      if (quantity <= 0 || quantity > material.quantity) {
        return res.status(400).json({ success: false, message: 'Sorry, not enough quantity available to decrease' });
      }
  
      // Decrease the quantity by the specified amount
      material.quantity -= quantity;
      await material.save();
  
      res.status(200).json({ success: true, message: 'Material quantity decreased successfully', material });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }; */
  