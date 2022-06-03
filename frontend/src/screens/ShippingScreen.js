import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import { Store } from '../Store.js';
import { useNavigate } from 'react-router-dom';

function ShippingScreen() {
const [shippingState, setShippingState] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
})

const {state: {cart: {shippingAddress}}, dispatch: contextDispatch} = useContext(Store);
const navigate = useNavigate()

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
      <div className="container small-container">
      <h1 className='my-3'>Shipping Address</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='mb-3' controlId='fullName'>
            <Form.Label>Full Name</Form.Label>
            <Form.Control
            required
            name="fullName"
            value={shippingState.fullName || shippingAddress?.fullName}
            onChange={handleChange}
             />
        </Form.Group>
        <Form.Group className='mb-3' controlId='address'>
            <Form.Label>Street Address</Form.Label>
            <Form.Control
            required
            value={shippingState.address || shippingAddress?.address}
            name="address"
            onChange={handleChange}
             />
        </Form.Group>
        <Form.Group className='mb-3' controlId='city'>
            <Form.Label>City</Form.Label>
            <Form.Control
            required
            name="city"
            value={shippingState.city || shippingAddress?.city}
            onChange={handleChange}
             />
        </Form.Group>
        <Form.Group className='mb-3' controlId='state'>
            <Form.Label>State</Form.Label>
            <Form.Control
            required
            name="state"
            value={shippingState.state || shippingAddress?.state}
            onChange={handleChange}
             />
        </Form.Group>
        <Form.Group className='mb-3' controlId='postalCode'>
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
            required
            name="postalCode"
            value={shippingState.postalCode || shippingAddress?.postalCode}
            onChange={handleChange}
             />
        </Form.Group>
        <Form.Group className='mb-3' controlId='country'>
            <Form.Label>Country</Form.Label>
            <Form.Control
            required
            name="country"
            value={shippingState.country || shippingAddress?.country}
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