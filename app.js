require('dotenv').config()

const cors = require('cors')
const mongoose = require('mongoose')
const express = require('express')
const app = express()


// middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


// routes
const productRoutes = require('./routes/product.routes.js')


app.use('/api/product', productRoutes)
app.get('/api/product', (req, res) => {
    res.status(200).json({
        message: 'Crud app.js is listening'
    })
})


// connect database
const PORT = process.env.PORT || 5000

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('connected to database') // optional: console.log(response.connection.host);

        app.listen(PORT, () => {
            console.log('server is listening or port 5000..')
        })

    } catch (err) {
        console.log('Database connection failed', err)
        process.exit(1) // optional: stop app if database fails
    }
}

connectDB()
