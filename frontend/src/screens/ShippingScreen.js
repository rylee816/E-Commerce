import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

function ShippingScreen() {
const [fullName, setFullName] = useState('');
const [address, setAddress] = useState('');
const [city, setCity] = useState('');
const [state, setState] = useState('');
const [postalCode, setPostalCode] = useState('');
const [country, setCountry] = useState('');

const submitHandler = async (e) => {
    e.preventDefault();
    console.log(address);
}

  return (
      <>
      <Helmet>
          <title>Shipping Address</title>
      </Helmet>
      <h1 className='my-3'>Shipping Address</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='mb-3' controlId='fullName'>
            <Form.Label>Full Name</Form.Label>
            <Form.Control
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
             />
        </Form.Group>
        <Form.Group className='mb-3' controlId='address'>
            <Form.Label>Street Address</Form.Label>
            <Form.Control
            value={address}
            name="address"
            onChange={(e) => setAddress(e.target.value)}
             />
        </Form.Group>
        <Form.Group className='mb-3' controlId='city'>
            <Form.Label>City</Form.Label>
            <Form.Control
            value={city}
            onChange={(e) => setCity(e.target.value)}
             />
        </Form.Group>
        <Form.Group className='mb-3' controlId='state'>
            <Form.Label>State</Form.Label>
            <Form.Control
            value={state}
            onChange={(e) => setState(e.target.value)}
             />
        </Form.Group>
        <Form.Group className='mb-3' controlId='postalCode'>
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
             />
        </Form.Group>
        <Form.Group className='mb-3' controlId='country'>
            <Form.Label>Country</Form.Label>
            <Form.Control
            value={country}
            onChange={(e) => setCountry(e.target.value)}
             />
        </Form.Group>
        <div className="mb-3">
        <Button type="submit" variant="primary">Continue</Button>
        </div>
      </Form>
      </>
  )
}

export default ShippingScreen