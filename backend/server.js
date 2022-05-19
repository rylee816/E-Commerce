import express from 'express';
import data from './data.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())


app.get("/api/products", (req, res) => {
    res.send(data.products)
})


const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})