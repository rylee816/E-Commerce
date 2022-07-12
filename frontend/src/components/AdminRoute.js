import React from 'react';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Store } from '../Store';

function AdminRoute({ children }) {
const { state: {userInfo } } = useContext(Store);

  return (
    userInfo && userInfo.isAdmin ? children : <Navigate to="/signin" />
  )
}

export default AdminRoute