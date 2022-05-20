import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import Card from 'react-bootstrap/esm/Card';
import Rating from "./Rating";


function Product({ product }) {
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
        <Button className="btn btn-md btn-primary">Add to Cart</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Product;
