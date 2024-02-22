import express from 'express';
import { addMaterial,  deleteMaterial, getMaterial, updateMaterial } from '../controllers/MaterialControllers.js';


const router = express.Router();
router.post('/material',addMaterial)
router.get('/material/:id', getMaterial); 
router.delete('/material',deleteMaterial)
router.put('/material',updateMaterial)
/* router.put('/material/decrease', decreaseMaterialQuantity); */



export default router;
