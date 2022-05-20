import React, { useEffect, useReducer, useState } from "react";
import fetchData from "../reducers/fetchData.reducer";
import logger from "use-reducer-logger";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Product from "../components/Product";

function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(
    logger(fetchData),
    {
      products: [],
      loading: true,
      error: "",
    }
  );

  useEffect(() => {
    const fetchData = async function () {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await fetch("http://localhost:3001/api/products");
        const data = await result.json();
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Featured Products</h1>
      <div className="products">
        {loading ? (
          <div>
            <h1>Loading...</h1>
          </div>
        ) : error ? (
          <div>{error}</div>
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
