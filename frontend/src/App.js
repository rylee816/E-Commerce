import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";
import HomeScreen from "./screens/HomeScreen";

function App() {
  return (
    <Router>
      <div>
        <header>
          <Link to="/">amazona</Link>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomeScreen />}/>
            <Route path="/product/:slug" element={<ProductScreen/>}/>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
