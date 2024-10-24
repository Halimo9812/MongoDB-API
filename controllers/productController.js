import Product from '../model/product.js';

// Get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Get product by ID
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Add a new product
export const addProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ msg: error.message }); // Bad Request
    }
};

// Update a product
export const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedProduct) {
            return res.status(404).json({ msg: "Product not found" });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ msg: error.message }); // Bad Request
    }
};

// Delete a product
export const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ msg: "Product not found" });
        }
        res.status(200).json({ msg: "Product deleted successfully!" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};