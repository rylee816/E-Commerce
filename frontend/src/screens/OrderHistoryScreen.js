import React, { useContext, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Loader from '../components/Loader';
import MessageBox from '../components/MessageBox';
import reducer from '../reducers/fetchData.reducer';
import Axios from 'axios';
import { Store } from '../Store';
import {baseUrl, getError } from '../utils';
import Button from 'react-bootstrap/Button';


function OrderHistoryScreen() {
    const { state } = useContext(Store);
    const { userInfo } = state;
    const navigate = useNavigate();

    const [{ products: orders, loading, error }, dispatch] = useReducer(reducer, {
        loading: true,
        products: [],
        error: ''
    });
   
    useEffect(() => {
        !userInfo && navigate('/signin');

        dispatch({ type: 'FETCH_REQUEST' });
        const fetchOrders = async () => {
            try {
                const { data } = await Axios.get(`${baseUrl}/api/orders/history`, {
                    headers: { authorization: `Bearer ${userInfo.token}` }
                });
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) })
            }
        }
            fetchOrders();   
    }, [userInfo, navigate]);

  return (
    <div>
        <Helmet>
            <title>Order History</title>
        </Helmet>
        <h1>Order History</h1>
        {loading ? (
            <Loader />
        ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
        ) : (
            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <td>${order.totalPrice.toFixed(2)}</td>
                        <td>{order.paidAt ? order.paidAt.substring(0, 10) : 'pending'}</td>
                        <td>{order.deliveredAt ? order.deliveredAt : 'pending'}</td>
                        <td><Button
                            type="button"
                            variant="light"
                            onClick={() => navigate(`/orders/${order._id}`)}
                        >Details</Button>
                        </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
    </div>
  )
}

export default OrderHistoryScreen