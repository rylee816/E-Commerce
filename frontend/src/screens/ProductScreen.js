import React, { useContext, useEffect, useReducer } from "react";
import Axios from "axios";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import { useNavigate, useParams } from "react-router-dom";
import dataReducer from "../reducers/fetchData.reducer";
import ListGroup from "react-bootstrap/ListGroup";
import Rating from "../components/Rating";
import Button from "react-bootstrap/esm/Button";
import { Helmet } from "react-helmet-async";
import Loader from "../components/Loader";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";
import { Store } from "../Store";

function ProductScreen() {
  const navigate = useNavigate()
  const { slug } = useParams();
  const [{ loading, error, products: product }, dispatch] = useReducer(
    dataReducer,
    {
      product: [],
      loading: true,
      error: "",
    }
  );

  useEffect(() => {
    const fetchData = async function () {
      dispatch({ type: "FETCH_REQUEST" });

      try {
        const result = await Axios.get(
          `http://localhost:3001/api/products/${slug}`
        );
        const { data } = await result;
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, [slug]);


  const {state, dispatch: contextDispatch} = useContext(Store);
  const {cart} = state;
  
  const addToCartHandler = async () => {
    const itemExists = cart.cartItems.find(item => item._id === product._id);
    const quantity = itemExists ? itemExists.quantity + 1 : 1;

    const {data} = await Axios.get(`http://localhost:3001/api/products/id/${product._id}`);
    if (data.countInStock < quantity){
      window.alert('We apologize, but this item is out of stock.');
      return;
    }
    contextDispatch({type: 'CART_ADD_ITEM', payload: {...product, quantity}});
    navigate("/cart")
  }
  console.log(state.cart.cartItems)
  
  return loading ? (
    <Loader />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div style={{ background: "white" }}>
      <Row>
        <Col md={6}>
          <img className="img-large" src={product.image} alt={product.name} />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
              <h1>{product.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating rating={product.rating} numReviews={product.numReviews} />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>
              Description:
              <p>{product.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? (
                        <Badge bg="success">In Stock</Badge>
                      ) : (
                        <Badge bg="danger">Out of Stock</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button onClick={addToCartHandler} className="btn-sm" variant="primary">
                        Add to Cart
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ProductScreen;
