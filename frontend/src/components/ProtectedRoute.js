import React from 'react';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Store } from '../Store';

function ProtectedRoute({ children }) {
const { state: { userInfo } } = useContext(Store);

  return (
    userInfo ? children : <Navigate to="/signin" />
  )
}

export default ProtectedRoute