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
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';


function OrderDetailsScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ products: order, loading, error, loadingPay, errorPay, successPay }, dispatch] = useReducer(reducer, 
    {
      products: {},
      loading: true,
      error: '',
      loadingPay: false,
      errorPay: '',
      successPay: false
    }
    );
  const { id } = useParams();
  const navigate = useNavigate();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  function createOrder(data, actions) {
    return actions.order.create({
      purchase_units: [
        {
          amount: { value: order.totalPrice },
        },
      ],
    })
    .then(orderId => {
      return orderId;
    })
  }

  function onApprove(data, actions) {
    return actions.order.capture().then(async function(details){
      try {
        dispatch({ type: 'PAY_REQUEST' });
        const { data } = await Axios.put(`http://localhost:3001/api/orders/${order._id}/pay`,
        details,
        {
          headers : {authorization: `Bearer ${userInfo.token}`}
        }
        );
        dispatch({ type: 'PAY_SUCCESS', payload: data });
        toast.success('Payment accepted!');
      } catch (err) {
        dispatch({type: 'PAY_FAIL', payload: getError(err)});
        toast.error(getError(errorPay));
      }
    })
  }

  function onError(err){
    toast.error(getError(err));
  }
  
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({type: 'FETCH_REQUEST'})
        const { data } = await Axios.get(`http://localhost:3001/api/orders/${id}`, {
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

    if (!order._id || successPay || (order._id && order._id !== id)){
      fetchOrder();
      if (successPay) {
        dispatch({type: 'PAY_RESET'});
      }
    } else {
      const loadPaypalScript = async () => {
        const { data: clientId } = await Axios.get('http://localhost:3001/api/keys/paypal', {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': clientId,
            currency: 'USD'
          },
        });
        paypalDispatch({type: 'setLoadingStatus', value: 'pending'});
      }
      setTimeout(() => {
        loadPaypalScript();
      }, 2000)
    }

  }, [order, navigate, userInfo, id, paypalDispatch, successPay])

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
                {order.isPaid ? (
                  <MessageBox variant="success">
                    Paid at {order.paidAt}
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
                            <span>({item.quantity})</span>
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
                      {!order.isPaid && (
                        <ListGroup.Item>
                          {isPending ? (
                            <Loader />
                          ) : (
                            <div>
                              <PayPalButtons
                              createOrder={createOrder}
                              onApprove={onApprove}
                              onError={onError}
                              ></PayPalButtons>
                            </div>
                          )}
                          {loadingPay && (<Loader />)}
                        </ListGroup.Item>
                      )}
                    </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
    </div>
  )
}

export default OrderDetailsScreen