import mongoose from 'mongoose';
import Product from './product.js';

const Indexes = async () => {
    // Create indexes
    await Product.createIndexes([
        { name: 1 },
        { price: 1 },
        { quantity: 1 },
        { description: 1 },
        { price: 1, quantity: 1 } 

    
    ]);
};

export default Indexes;