import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


// import data from "../data";

function HomeScreen() {
const [data, setData] = useState([])

async function getData(){
    const res = await fetch("http://localhost:3001/api/products")
    const data = await res.json()
    setData(data)
}

useEffect(() => {
    getData()
}, [])

  return (
    <div>
      <h1>Featured Products</h1>
      <div className="products">
        {data.map((product) => (
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
        ))}
      </div>
    </div>
  );
}

export default HomeScreen;
