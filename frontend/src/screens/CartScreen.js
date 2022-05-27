import Button from "react-bootstrap/esm/Button";
import React, { useContext } from "react";
import Col from "react-bootstrap/esm/Col";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import Row from "react-bootstrap/esm/Row";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import MessageBox from "../components/MessageBox";
import { Store } from "../Store";
import Axios from "axios";

function CartScreen() {
  const {
    state: {
      cart: { cartItems },
    },
    dispatch: contextDispatch,
  } = useContext(Store);

  const navigate = useNavigate();

  let amountOfItems = cartItems.reduce((a, b) => a + b.quantity, 0);
  console.log(cartItems);

  const updateCartHandler = async (item, quantity) => {
    const { data } = await Axios.get(
      `http://localhost:3001/api/products/id/${item._id}`
    );
    
    if (data.countInStock < item.quantity){
        alert(`Sorry but ${data.name} is out of stock.`);
        return;
    }
    contextDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity},
    });
  };

  function deleteItemHandler(item){
      contextDispatch({type: 'CART_REMOVE_ITEM', payload: item})
  }

  const checkoutHandler = () => {
      navigate('/signin?redirect=/shipping');
  }

  return (
    <>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Your Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty. <Link to="/">Shop Now!</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      />{" "}
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        variant="light"
                        disabled={item.quantity === 1}
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>{" "}
                      <span>{item.quantity}</span>{" "}
                      <Button
                        variant="light"
                        disabled={item.quantity === item.countInStock}
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                        }
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col md={3}>${item.price}</Col>
                    <Col md={2}>
                      <Button 
                      variant="danger"
                      onClick={() => deleteItemHandler(item)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Subtotal ({amountOfItems}{" "}
                    {amountOfItems === 1 ? "item" : "items"}) : $
                    {cartItems.reduce((a, b) => a + b.price * b.quantity, 0)}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      variant="primary"
                      disabled={cartItems.length === 0}
                      onClick={checkoutHandler}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default CartScreen;
