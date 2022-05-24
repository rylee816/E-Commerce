import express from 'express';
import data from './data.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());


app.get("/api/products", (req, res) => {
    res.send(data.products)
})

app.get("/api/products/:slug", (req, res) => {
    let { slug } = req.params;
    let product = data.products.find(product => product.slug === slug);
    if(product) {
        res.send(product);
    } else {
        res.status(404).send({message: 'Product Not Found'})
    }
});

app.get("/api/products/id/:id", (req, res) => {
    let { id } = req.params;
    let product = data.products.find(product => product._id === id);
    if(product) {
        res.send(product);
    } else {
        res.status(404).send({message: 'Product Not Found'})
    }
});


const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
});