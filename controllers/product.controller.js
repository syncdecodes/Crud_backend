const { generateAlias } = require('../utils/alias-generator.js')

/** @type {import('mongoose').Model<any>} */
const Product = require('../model/product.model.js')
/** @type {import('mongoose').Model<any>} */
const User = require('../model/user.model.js')

const createProduct = async (req, res) => {

    try {

        const { name, price, quantity, browserId } = req.body

        if (!browserId) {
            return res.status(400).json({
                success: false,
                message: "Browser ID required"
            })
        }

        let user = await User.findOne({ browserId })

        if (!user) {
            user = await User.create({
                browserId,
                alias: generateAlias(),
                ip: req.ip,
                userAgent: req.headers["user-agent"]
            })
        }

        const productCount = await Product.countDocuments({ user: user._id });
        if (productCount >= 10) {
            return res.status(403).json({
                success: false,
                message: 'Database Limit Reached (Max 5). Please delete a product to add a new one.'
            })
        }


        if (!name || !price) {
            return res.status(404).json({
                success: false,
                message: 'Please fill in all the fields'
            })
        }

        await Product.create({
            name,
            price,
            quantity,
            user: user._id
        })

        res.status(201).json({
            success: true,
            message: 'Product created successfully'
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findByIdAndUpdate(id, req.body) // update with req.body

        if (!product) {
            return res.status(404).json({ success: false, message: `Product with id ${id} not found` })
        }

        res.status(200).json({ success: true, message: 'Product updated successfully' })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findByIdAndDelete(id)
        if (!product) {
            return res.status(404).json({ success: false, message: `Product with id ${id} not found` })
        }
        res.status(200).json({ success: true, message: 'product deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getProduct = async (req, res) => {
    try {

        const { browserId } = req.params

        const user = await User.findOne({ browserId })

        if (!user) {
            return res.status(200).json({
                success: true,
                count: 0,
                stats: { totalItems: 0, totalValue: 0 },
                data: []
            })
        }

        // Pagination logic
        // const page = parseInt(req.query.page) || 1
        // const limit = parseInt(req.query.limit) || 10
        // const skip = (page - 1) * limit;

        // Search logic
        const { search } = req.query;
        let query = { user: user._id }
        if (search) {
            query.name = { $regex: search, $options: 'i' } // Case-insensitive search
        }

        // Fetch data with sorting (newest first)
        const products = await Product.find(query)
            .sort({ createdAt: -1 })
        // .skip(skip)
        // .limit(limit)

        if (!products) {
            return res.status(404).json({
                success: false,
                message: 'Products not found'
            })
        }

        const stats = {
            totalItems: products.length,
            totalValue: products.reduce((acc, p) => acc + (p.price * p.quantity), 0)
        }

        res.status(200).json({
            success: true,
            count: products.length,
            stats: stats,
            data: products
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getSpecificProduct = async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findById(id)

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            })
        }

        res.status(200).json({
            success: true,
            data: product
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getSpecificProduct
}