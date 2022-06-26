import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductScreen from "./screens/ProductScreen";
import HomeScreen from "./screens/HomeScreen";
import Navbar from "react-bootstrap/Navbar";
import Nav from 'react-bootstrap/Nav';
import Container from "react-bootstrap/Container";
import LinkContainer from 'react-router-bootstrap/LinkContainer';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge';
import { useContext } from "react";
import { Store } from "./Store";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import SignupScreen from "./screens/SignupScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderDetailsScreen from "./screens/OrderDetailsScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { useEffect } from "react";
import {baseUrl, getError } from "./utils";
import Axios from 'axios';
import SearchBox from "./components/SearchBox";
import SearchScreen from "./screens/SearchScreen";

function App() {
  const {state: {cart, userInfo}, dispatch: contextDispatch} = useContext(Store);

  const signoutHandler = () => {
    contextDispatch({type: 'USER_SIGNOUT'});
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await Axios.get(
          `${baseUrl}/api/products/categories`
        );
        setCategories(data)
      } catch (err){
        toast.error(getError(err));
      }
    }
    fetchCategories()
  }, [])

  return (
    <Router>
      <div className={sidebarIsOpen 
      ? "d-flex flex-column site-container active-cont"
      : "d-flex flex-column site-container"
      }
      >
      <ToastContainer position="top-center" limit={1} />
        <header>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
          <Button 
          className="mx-3"
          variant="dark"
          onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
          >
            <i className="fas fa-bars"></i>
          </Button>
          <LinkContainer to="/">
            <Navbar.Brand>Men's Swear House</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox />
          <Nav className="me-auto w-100 justify-content-end">
            <Link to="/cart" className="nav-link">
              Cart
              {cart.cartItems.length > 0 && (
                <Badge pill bg="danger">
                  {cart.cartItems.reduce((a, b) => a + b.quantity, 0)}
                </Badge>
              )}
            </Link>
            {userInfo ? (
              <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                <LinkContainer to="/profile">
                  <NavDropdown.Item>User Profile</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/orderhistory">
                  <NavDropdown.Item>Order History</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                  <Link 
                  className="dropdown-item" 
                  to="#signout"
                  onClick={signoutHandler}
                  >
                      Sign Out
                  </Link>
              </NavDropdown>
            ) : (
              <Link to="/signin" className="nav-link">Sign In</Link>
            )}
          </Nav>
          </Navbar.Collapse>
          </Container>
        </Navbar>
        </header>
        <div
        className={sidebarIsOpen 
        ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
        : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
        }
        >
          <Nav className="flex-column text-white w-100 p-2">
            <Nav.Item>
              <strong>Categories</strong>
            </Nav.Item>
            {categories.map(category => (
              <Nav.Item key={category}>
                <LinkContainer 
                to={`/search?category=${category}`}
                onClick={() => setSidebarIsOpen(false)}
                >
                  <Nav.Link>{category}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))}
          </Nav>
        </div>
        <main>
        <Container className="mt-3">
          <Routes>
            <Route path="/" element={<HomeScreen />}/>
            <Route path="/product/:slug" element={<ProductScreen/>}/>
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/search" element={<SearchScreen />} />
            <Route path='/signin' element={<LoginScreen />}/>
            <Route path='/signup' element={<SignupScreen />}/>
            <Route path='/shipping' element={<ShippingScreen />}/>
            <Route path='/payment' element={<PaymentMethodScreen />}/>
            <Route path='/placeorder' element={<PlaceOrderScreen />}/>
            <Route path='/orders/:id' element={<OrderDetailsScreen />}/>
            <Route path='/orderhistory' element={<OrderHistoryScreen />}/>
            <Route path='/profile' element={<ProfileScreen />}/>
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
