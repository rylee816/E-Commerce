import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import { isAuth } from "../utils.js";

const orderRouter = express.Router();

orderRouter.post('/', isAuth, expressAsyncHandler(async(req, res) => {
    const newOrder = new Order({
           orderItems: req.body.orderItems.map(item => ({...item, product: item._id})),
           shippingAddress: req.body.shippingAddress,
           paymentMethod: req.body.paymentMethod,
           itemsPrice: req.body.itemsPrice,
           shippingPrice: req.body.shippingPrice,
           taxPrice: req.body.taxPrice,
           totalPrice: req.body.totalPrice,
           user: req.user._id,
    })

    const order = await newOrder.save();
    res.status(201).send({message: 'New Order Created', order})
}));


orderRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    const order = await Order.findById(id);
    if(order){
        console.log(order);
        res.send(order)
    } else {
        res.status(404).send({message: 'Order Not Found'})
    }
});

export default orderRouter;