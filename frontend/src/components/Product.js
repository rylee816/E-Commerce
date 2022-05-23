import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import Card from 'react-bootstrap/esm/Card';
import Rating from "./Rating";
import { Store } from "../Store";

function Product({ product }) {
    const {state, dispatch: contextDispatch} = useContext(Store);

    function addToCartHandler(){
        contextDispatch({type: 'CART_ADD_ITEM', payload:{...product, quantity: 1}})
    }
    console.log(state.cart.cartItems)

  return (
    <Card className="px-2">
      <Link to={`/product/${product.slug}`}>
        <img className="card-img-top" src={product.image} alt={product.name} />
      </Link>
      <Card.Body>
      <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews}/>
        <Card.Text>${product.price}</Card.Text>
        <div className="d-grid">
        <Button onClick={addToCartHandler} className="btn btn-md btn-primary">Add to Cart</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Product;
