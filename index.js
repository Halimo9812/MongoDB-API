import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import Product from './model/product.js'
import productRoutes from './routes/productRoutes.js'
import indexes from './model/indexes.js'


dotenv.config();
//console.log(process.env.PORT)
const app = express()
const PORT = process.env.PORT;
 //middleware//

 app.use(express.json());

 //routes//
 app.use('/api/products',productRoutes)

//Connect to MongoDB//

mongoose.connect(process.env.MONGODB_URI, {
   
}).then(() => {
    console.log('connected!');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// API Endpoints
app.get('/', (req, res) => {
    res.send("Hello from API");
});

// Get all products
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

// Get product by ID
app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

// Add a new product
app.post('/api/products', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ msg: error.message }); // Bad Request
    }
});

// Update a product
app.put('/api/products/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedProduct) {
            return res.status(404).json({ msg: "Product not found" });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ msg: error.message }); // Bad Request
    }
});

// Delete a product
app.delete('/api/products/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ msg: "Product not found" });
        }
        res.status(200).json({ msg: "Product deleted successfully!" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});
//indexes
const init = async () => {
    await indexes(); 
};

init();
///server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});