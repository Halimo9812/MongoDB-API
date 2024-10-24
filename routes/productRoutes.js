import express from 'express'

import {getAllProducts} from '../controllers/productController.js'
import {getProductById} from '../controllers/productController.js'
import {addProduct} from '../controllers/productController.js'
import {updateProduct} from '../controllers/productController.js'
import {deleteProduct} from '../controllers/productController.js'

const router = express.Router();

router.get('/', getAllProducts); // Get all products
router.get('/:id', getProductById); // Get product by ID
router.post('/', addProduct); // Add new product
router.put('/:id', updateProduct); // Update product
router.delete('/:id', deleteProduct); // Delete product

export default router;