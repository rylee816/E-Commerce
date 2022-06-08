import React, { useContext, useEffect, useReducer } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Axios from 'axios';
import reducer from '../reducers/fetchData.reducer.js';
import Loader from '../components/Loader';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';
import { getError } from '../utils.js';
import { Helmet } from "react-helmet-async";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';


function OrderDetailsScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ products: order, loading, error }, dispatch] = useReducer(reducer, 
    {
      products: {},
      loading: true,
      error: ''
    }
    );
  const { id } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchOrder = async() => {
      dispatch({type: 'FETCH_REQUEST'})
      try {
        const {data} = await Axios.get(`http://localhost:3001/api/orders/${id}`, {
          headers: { authorization: `Bearer ${userInfo.token}` }
        });
        dispatch({type: 'FETCH_SUCCESS', payload: data})
      } catch (err){
        dispatch({type: 'FETCH_FAIL', payload: getError(err)})
      }
    };
    
    if (!userInfo) {
      return navigate('/signin');
    }

    if (!order._id || (order._id && order._id !== id)){
      fetchOrder()
    }

  }, [order, navigate, userInfo, order._id, id])

console.log(order);
  return loading ? (
    <Loader />
  )
  : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  )
  : (
    <div>
      <Helmet>
        <title>{id}</title>
      </Helmet>  
        <h1 className='my-3'>Order #{id}</h1>
        <Row>
          <Col md={8}>
            <Card>
              <Card.Body>
                <Card.Title>Shipping</Card.Title>
                <Card.Text>
                <strong>Name:</strong>{' '}{order.shippingAddress.fullName} <br />
                            <strong>Address:</strong>{' '}{order.shippingAddress.address}<br />
                            {order.shippingAddress.city}, {order.shippingAddress.state}{' '} 
                            {order.shippingAddress.postalCode} {order.shippingAddress.country}
                </Card.Text>
                {order.isDelivered ? (
                  <MessageBox variant="sucess">
                    Delivered at {order.deliveredAt}
                  </MessageBox>
                ) : <MessageBox variant="danger">Not Delivered</MessageBox>}
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <Card.Title>Payment</Card.Title>
                <Card.Text>
                <strong>Payment Method:</strong>{' '}{order.paymentMethod}
                </Card.Text>
                {order.isDelivered ? (
                  <MessageBox variant="sucess">
                    Paid at {order.payedAt}
                  </MessageBox>
                ) : <MessageBox variant="danger">Payment Pending</MessageBox>}
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <Card.Title>Your Items</Card.Title>
                  <ListGroup>
                    {order.orderItems.map(item => (
                      <ListGroup.Item key={item._id}>
                        <Row className='align-items-center'>
                          <Col md={6}>
                            <img className=' img-fluid rounded img-thumbnail' src={item.image} alt={item.name} />{' '}
                            <Link  to={`/product/${item.slug}`}>{item.name}</Link>
                          </Col>
                          <Col md={3}>
                            <span>{item.quantity}</span>
                          </Col>
                          <Col md={3}>${item.price}</Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card mb="3">
              <Card.Body>
               <Card.Title>Order Summary</Card.Title>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <Row>
                          <Col>Items</Col>
                          <Col>${order.itemsPrice.toFixed(2)}</Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col>Tax</Col>
                          <Col>${order.taxPrice.toFixed(2)}</Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col>Shipping</Col>
                          <Col>${order.shippingPrice.toFixed(2)}</Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col>Total</Col>
                          <Col>${order.totalPrice.toFixed(2)}</Col>
                        </Row>
                      </ListGroup.Item>
                    </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
    </div>
  )
}

export default OrderDetailsScreen