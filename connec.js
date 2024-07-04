const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const { type } = require('express/lib/response');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//create schema
const productsSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})

//create model
const Product = mongoose.model('Product', productsSchema);

const connecDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://memories:kkhAipmOQ0VeNyuc@cluster0.q0gttvx.mongodb.net/')
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Could not connect to MongoDB', err);
        process.exit(1);
    }
}

//create route
app.post('/products', async (req, res) => {

    const newProduct = new Product({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price
    })
    await newProduct.save();
    res.status(201).send(newProduct);
})

app.get('/products', async (req, res) => {
    try {
        const price = req.query.price;
        if (price) {
            const products = await Product.find({ price: { $gte: price } }).countDocuments();
            res.status(200).send(products);
        } else {
            const products = await Product.find().sort({ price: 'desc' })
            res.status(200).send(products);
        }
    } catch (error) {
        res.status(500).send({
            message: 'Error retrieving products',
            error: error.message
        });
    }
})

app.get('/products/:id', async (req, res) => {

    try {
        const id = req.params.id;
        const products = await Product.findOne({ _id: id });
        if (products) {
            res.status(200).send(products);
        }
    } catch (error) {
        res.status(500).send({
            message: 'Error retrieving products',
            error: error.message
        });
    }
})

app.delete('/products/:id', async (req, res) => {
    try {

        const id = req.params.id;
        const products = await Product.deleteOne({ _id: id });
        res.status(200).send(products);

    } catch (error) {
        res.status(500).send({
            message: 'Error retrieving products',
            error: error.message
        })
    }
})

app.put('/products/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedProduct = await Product.updateOne({ _id: id }, {
            $set: {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price
            }
        }, { new: true });
        res.status(200).send(updatedProduct);
    } catch (error) {
        res.status(500).send({
            message: 'Error retrieving products',
            error: error.message
        })
    }
})


app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
    await connecDB();
})

module.exports = connecDB