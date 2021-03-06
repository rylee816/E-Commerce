import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import { Store } from '../Store.js';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps.js';

function ShippingScreen() {
const {state, dispatch: contextDispatch} = useContext(Store);
const {
    userInfo,
    cart: {shippingAddress}
} = state;
const navigate = useNavigate();


const [shippingState, setShippingState] = useState({
    fullName: shippingAddress.fullName || '',
    address: shippingAddress.address || '',
    city: shippingAddress.city || '',
    state: shippingAddress.state || '',
    postalCode: shippingAddress.postalCode || '',
    country: shippingAddress.country || '',
});

useEffect(() => {
    if (!userInfo) {
        navigate('/signin?redirect=/shipping');
    }
}, [userInfo, navigate]);


const handleChange = (e) => {
    const {name, value} = e.target;
    setShippingState(prev => {
        return {...prev, [name]: value}
    })
}

const submitHandler = async (e) => {
    e.preventDefault();
    const {fullName, address, city, state, postalCode, country} = shippingState;

    contextDispatch({type: 'SAVE_SHIPPING_ADDRESS', payload: {
        fullName,
        address,
        city,
        state,
        postalCode,
        country
    }});

    localStorage.setItem('shippingAddress', JSON.stringify({
        fullName,
        address,
        city,
        state,
        postalCode,
        country
    }));
    navigate('/payment');
};


  return (
      <>
      <Helmet>
          <title>Shipping Address</title>
      </Helmet>
      <CheckoutSteps step1 step2/>
      <div className="container small-container">
      <h1 className='my-3'>Shipping Address</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='mb-3' controlId='fullName'>
            <Form.Label>Full Name</Form.Label>
            <Form.Control
            required
            name="fullName"
            value={shippingState.fullName}
            onChange={handleChange}
             />
        </Form.Group>
        <Form.Group className='mb-3' controlId='address'>
            <Form.Label>Street Address</Form.Label>
            <Form.Control
            required
            value={shippingState.address}
            name="address"
            onChange={handleChange}
             />
        </Form.Group>
        <Form.Group className='mb-3' controlId='city'>
            <Form.Label>City</Form.Label>
            <Form.Control
            required
            name="city"
            value={shippingState.city}
            onChange={handleChange}
             />
        </Form.Group>
        <Form.Group className='mb-3' controlId='state'>
            <Form.Label>State</Form.Label>
            <Form.Control
            required
            name="state"
            value={shippingState.state}
            onChange={handleChange}
             />
        </Form.Group>
        <Form.Group className='mb-3' controlId='postalCode'>
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
            required
            name="postalCode"
            value={shippingState.postalCode}
            onChange={handleChange}
             />
        </Form.Group>
        <Form.Group className='mb-3' controlId='country'>
            <Form.Label>Country</Form.Label>
            <Form.Control
            required
            name="country"
            value={shippingState.country}
            onChange={handleChange}
             />
        </Form.Group>
        <div className="mb-3">
        <Button type="submit" variant="primary">Continue</Button>
        </div>
      </Form>
      </div>
      </>
  )
}

export default ShippingScreen