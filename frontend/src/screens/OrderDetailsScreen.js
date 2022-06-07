import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios';

function OrderDetailsScreen() {
  const [order, setOrder] = useState({});
  const {id} = useParams();
  console.log(id);
  
  useEffect(() => {
    const fetchOrder = async() => {
      const {data} = await Axios.get(`http://localhost:3001/api/orders/${id}`);
      setOrder(data)
    }
    fetchOrder()
  }, [])


  return (
    <div>
      {JSON.stringify(order)}
    </div>
  )
}

export default OrderDetailsScreen