import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/esm/Card";
import Rating from "./Rating";
import { Store } from "../Store";
import Axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../utils";


function Product({ product }) {
  const {
    state: {
      cart: { cartItems },
    },
    dispatch: contextDispatch,
  } = useContext(Store);

  const addToCartHandler = async (item) => {
    const itemExists = cartItems.find((item) => item._id === product._id);
    const quantity = itemExists ? itemExists.quantity + 1 : 1;
    const { data } = await Axios.get(
      `${baseUrl}/api/products/id/${item._id}`
    );

    if (data.countInStock < quantity) {
      toast.error(`Sorry but ${data.name} is out of stock.`);
      return;
    }
    contextDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  return (
    <Card className="px-2">
      <Link to={`/product/${product.slug}`}>
        <img className="card-img-top" src={product.image} alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>${product.price}</Card.Text>
        <div className="d-grid">
          {product.countInStock === 0 ? (
            <Button variant="light" disabled>
              Out of Stock
            </Button>
          ) : (
            <Button
              onClick={() => addToCartHandler(product)}
              className="btn btn-md btn-primary"
            >
              Add to Cart
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default Product;
