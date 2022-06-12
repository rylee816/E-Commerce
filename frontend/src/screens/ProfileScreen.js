import React, { useState, useReducer } from "react";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Store } from "../Store";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Axios from 'axios';
import { toast } from "react-toastify";
import { getError } from "../utils";
import Loader from "../components/Loader";
import MessageBox from "../components/MessageBox";

function ProfileScreen() {
  const { state, dispatch: contextDispatch } = useContext(Store);
  const { userInfo } = state;
  const reducer = (state, action) => {
    switch(action.type){
      case 'UPDATE_REQUEST':
      return {...state, loading: true};
      case 'UPDATE_SUCCESS':
      return {...state, loading: false};
      case 'UPDATE_FAIL':
      return {...state, loading: false, error: action.payload}
      default: 
      return state
    }
  }
  const [{ error, loading }, dispatch] = useReducer(reducer, {
    error: '',
    loading: false,
  })

  const [name, setName] = useState(userInfo?.name);
  const [email, setEmail] = useState(userInfo?.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password && !confirmPassword){
      return toast.error('Please confirm password')
    }
    if (password && password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }

    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      const { data } = await Axios.put('http://localhost:3001/api/users/profile', {
        name,
        email,
        password
      },
      {
        headers: { authorization: `Bearer ${userInfo.token}`}
      }
      );
      dispatch({ type: 'UPDATE_SUCCESS' });
      contextDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('Profile updated successfully');

    } catch (err) {
      dispatch({ type: 'UPDATE_FAIL', payload: getError(err) });
      toast.error(getError(err));
    }
  }
  
  return loading ? (
    <Loader />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className="container small-container">
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <h1 className="my-3">Your Profile</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">
            Update
          </Button>
          </div>
      </Form>
    </div>
  );
}

export default ProfileScreen;
