import express from 'express';
import Products from '../models/productModel.js'

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {

const products = await Products.find({});
res.send(products)
})

productRouter.get("/:slug", async (req, res) => {
    let { slug } = req.params;
   const product = await Products.findOne({slug: slug})

   if(product){
       res.send(product);
   } else {
       res.status(404).send({message: 'Product Not Found'})
   }
});

productRouter.get("/id/:id", async (req, res) => {
    let { id } = req.params;
    let product = await Products.findById(id);
    if(product) {
        res.send(product);
    } else {
        res.status(404).send({message: 'Product Not Found'})
    }
});

export default productRouter;