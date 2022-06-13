import React, { useEffect, useReducer, useState } from "react";
import Axios from 'axios';
import dataReducer from "../reducers/fetchData.reducer";
// import logger from "use-reducer-logger";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Product from "../components/Product";
import { Helmet } from "react-helmet-async";
import Loader from "../components/Loader";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils"

function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(
    dataReducer,
    {
      products: [],
      loading: false,
      error: '',
    }
  );

  useEffect(() => {
    const fetchData = async function () {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await Axios.get("http://localhost:3001/api/products");
        const {data} = await result;
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, []);

  return (
    <div>
    <Helmet>
      <title>Men's Swear House</title>
    </Helmet>
      <h1>Featured Products</h1>
      <div className="products">
        {loading ? (
         <Loader />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product}/>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
