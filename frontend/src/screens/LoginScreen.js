import Button from 'react-bootstrap/Button'
import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import Form from 'react-bootstrap/Form'
import { Helmet } from 'react-helmet-async'
import { Link, useLocation } from 'react-router-dom'

function LoginScreen() {
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

  return (
    <Container className='small-container'>
        <Helmet>
            <title>Sign In</title>
        </Helmet>
        <h1 className="my-3">Sign In</h1>
        <Form>
            <Form.Group className='mb-3' controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' required />
            </Form.Group>
            <Form.Group className='mb-3' controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' required />
            </Form.Group>
            <div className="mb-3">
                <Button variant='primary' type='submit'>Submit</Button>
            </div>
            <div className="mb-3">
                New customer? {' '}
                <Link to={`/signup?redirect=${redirect}`}>Create an account</Link>
            </div>
        </Form>
    </Container>
  )
}

export default LoginScreen