import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import product from './model/product.js'


dotenv.config();
console.log(process.env.PORT)
const app = express()
const PORT = process.env.PORT;
 //middleware//

 app.use(express.json());

//app.listen(3000, ()=> {
   // console.log('running on port 3000')
//});

app.get('/', (req,res) => {
    res.send("hello from api")
});

app.get('/api/products', async (req,res) => {

    try{
        const products = await product.find({})
        res.status(201).json(products);
    } catch (error){

        res.status(500).json({msg:error.message})

    }
})

app.post ('/api/products', async (req,res)=> {
    try{

    const newProduct = await product.create(req.body)
    res.status(200).json(newProduct)

    } catch (error) {
        res.status(500).json({msg: error.message})
    }
})

mongoose.connect(process.env.MONGODB_URI, {
   
}).then(() => {
    console.log('connected!');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});