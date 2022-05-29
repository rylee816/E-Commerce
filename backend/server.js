import express from 'express';
import data from './data.js';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to Atlas DB');
})
.catch(err => console.log(err.message))


app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);



const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
});