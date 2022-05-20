import React, { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import fetchData from "../reducers/fetchData.reducer";
import logger from "use-reducer-logger";

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
          products.map((product) => (
            <div className="product" key={product.slug}>
              <Link to={`/product/${product.slug}`}>
                <img src={product.image} alt={product.name} />
              </Link>
              <div className="product-info">
                <Link to={`/product/${product.slug}`}>
                  <p>{product.name}</p>
                </Link>
                <p>
                  <strong>${product.price}</strong>
                </p>
                <button>Add to Cart</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
