import React, { useContext, useEffect, useReducer } from 'react';
import Axios from 'axios';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Card from 'react-bootstrap/Card';
import { Helmet } from 'react-helmet-async';
import CheckoutSteps from '../components/CheckoutSteps.js';
import { Store } from '../Store.js';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import reducer from '../reducers/fetchOrder.reducer.js';
import { toast } from 'react-toastify';
import { getError } from '../utils.js';
import Loader from '../components/Loader.js';

function PlaceOrderScreen() {
const [{loading, error}, dispatch] = useReducer(reducer, {
    loading: false,
    error: ''
});

const { state, dispatch: contextDispatch } = useContext(Store);
const { cart, userInfo } = state;
const navigate = useNavigate();

const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

cart.itemsPrice = round2(
    cart.cartItems.reduce((a, b) => a + b.quantity * b.price, 0)
);
cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);

cart.taxPrice = round2(cart.itemsPrice * .08);

cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;



const placeOrderHandler = async() => {
    try {
        dispatch({type: 'CREATE_REQUEST'});
       const { data } = await Axios.post('http://localhost:3001/api/orders',
       {
           orderItems: cart.cartItems,
           shippingAddress: cart.shippingAddress,
           paymentMethod: cart.paymentMethod,
           itemsPrice: cart.itemsPrice,
           shippingPrice: cart.shippingPrice,
           taxPrice: cart.taxPrice,
           totalPrice: cart.totalPrice,
       },
       {
           headers: {
               authorization: `Bearer ${userInfo.token}`
           }
       }
       );
       contextDispatch({ type: 'CART_CLEAR' });
       dispatch({ type: 'CREATE_SUCCESS' });
       localStorage.removeItem('cartItems');
       navigate(`/orders/${data.order._id}`);
       console.log(data);

    } catch (err) {
        dispatch({type: 'CREATE_FAIL'});
        toast.error(getError(err));
    }
}

useEffect(() => {
    if (!cart.paymentMethod) {
        navigate('/payment')
    }
}, [cart, navigate]);

  return (
    <div>
        <CheckoutSteps step1 step2 step3 step4 />
        <Helmet>
            <title>Place Order</title>
        </Helmet>
        <h1 className="my-4">Review Order</h1>
        <Row>
            <Col md={8}>
                <Card className="mb-3 px-3">
                    <Card.Body>
                        <Card.Title className='mb-3'>Shipping</Card.Title>
                        <Card.Text>
                            <strong>Name:</strong>{' '}{cart.shippingAddress.fullName} <br />
                            <strong>Address:</strong>{' '}{cart.shippingAddress.address}<br />
                            {cart.shippingAddress.city}, {cart.shippingAddress.state}{' '} 
                            {cart.shippingAddress.postalCode} {cart.shippingAddress.country}
                        </Card.Text>
                        <Link to="/shipping">Edit</Link>
                    </Card.Body>
                </Card>
                <Card className="mb-3 px-3">
                    <Card.Body>
                        <Card.Title className='mb-3'>Payment</Card.Title>
                        <Card.Text>
                            <strong>Method:</strong>{' '}{cart.paymentMethod}
                        </Card.Text>
                        <Link to="/payment">Edit</Link>
                    </Card.Body>
                </Card>
                <Card className="mb-3 px-3">
                    <Card.Body>
                        <Card.Title className='mb-3'>Your Order</Card.Title>
                            <ListGroup variant="flush">
                                {cart.cartItems.map(item => (
                                    <ListGroup.Item key={item._id}>
                                        <Row className='align-items-center'>
                                            <Col md={6}>
                                                <img
                                                src={item.image}
                                                alt={item.name}
                                                className="img-fluid rouded img-thumbnail"
                                                >
                                                </img>{' '}
                                                <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={3}>
                                                ({item.quantity})
                                            </Col>
                                            <Col md={3}>${item.price}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        <Link to="/cart">Edit</Link>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={4}>
                <Card>
                    <Card.Body>
                        <Card.Title>Order Summary</Card.Title>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>{cart.itemsPrice.toFixed(2)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>{cart.shippingPrice.toFixed(2)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Taxes and Fees</Col>
                                    <Col>{cart.taxPrice.toFixed(2)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Order Total</Col>
                                    <Col>
                                    <strong>{cart.totalPrice.toFixed(2)}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <div className="d-grid">
                                    <Button
                                    type="button"
                                    disabled={cart.cartItems.length === 0}
                                    onClick={placeOrderHandler}
                                    >
                                        Place Order
                                    </Button>
                                </div>
                                {loading && <Loader />}
                            </ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </div>
  )
}

export default PlaceOrderScreen