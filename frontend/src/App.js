import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";
import HomeScreen from "./screens/HomeScreen";
import Navbar from "react-bootstrap/Navbar";
import Nav from 'react-bootstrap/Nav';
import Container from "react-bootstrap/Container";
import {LinkContainer} from 'react-router-bootstrap';
import Badge from 'react-bootstrap/Badge';
import { useContext } from "react";
import { Store } from "./Store";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import ShippingScreen from "./screens/ShippingScreen";

function App() {
  const {state: {cart}} = useContext(Store);

  return (
    <Router>
      <div className="d-flex flex-column site-container">
        <header>
        <Navbar bg="dark" variant="dark">
          <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Men Swear House</Navbar.Brand>
          </LinkContainer>
          <Nav className="me-auto">
            <Link to="/cart" className="nav-link">
              Cart
              {cart.cartItems.length > 0 && (
                <Badge pill bg="danger">
                  {cart.cartItems.reduce((a, b) => a + b.quantity, 0)}
                </Badge>
              )}
            </Link>
          </Nav>
          </Container>
        </Navbar>
        </header>
        <main>
        <Container className="mt-3">
          <Routes>
            <Route path="/" element={<HomeScreen />}/>
            <Route path="/product/:slug" element={<ProductScreen/>}/>
            <Route path="/cart" element={<CartScreen />} />
            <Route path='/signin' element={<LoginScreen />}/>
            <Route path='/shipping' element={<ShippingScreen />}/>
          </Routes>
        </Container>
        </main>
        <footer>
          <div className="text-center">All Rights Reserved</div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
