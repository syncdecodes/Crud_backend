const express = require('express')
const router = express.Router()

const {
    createProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getSpecificProduct  
} = require('../controllers/product.controller.js')

// createProduct
router.post('/', createProduct)

// updateProduct
router.put('/:id', updateProduct)

// deleteProduct
router.delete('/:id', deleteProduct)

// getProduct
router.get('/user/:browserId', getProduct)

// getSpecificProduct
router.get('/:id', getSpecificProduct)

module.exports = router