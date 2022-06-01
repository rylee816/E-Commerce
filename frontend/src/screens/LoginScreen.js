import Button from 'react-bootstrap/Button'
import React, { useContext, useState } from 'react'
import Container from 'react-bootstrap/esm/Container'
import Form from 'react-bootstrap/Form'
import { Helmet } from 'react-helmet-async'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Axios from 'axios';
import { Store } from '../Store.js'


function LoginScreen() {
    const navigate = useNavigate()
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {state, dispatch: contextDispatch} = useContext(Store);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
         const { data } = await Axios.post('http://localhost:3001/api/users/signin', {
             email,
             password
         });
         contextDispatch({type: 'USER_SIGNIN', payload: data})
        
         localStorage.setItem('userInfo', JSON.stringify(data));
         navigate(redirect || '/');

        } catch (err) {
            alert('Invalid email or password');
        }
    }

  return (
    <Container className='small-container'>
        <Helmet>
            <title>Sign In</title>
        </Helmet>
        <h1 className="my-3">Sign In</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group className='mb-3' controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' required onChange={(e) => setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group className='mb-3' controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' required onChange={(e) => setPassword(e.target.value)}/>
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