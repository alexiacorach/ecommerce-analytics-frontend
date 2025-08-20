import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import OrderSummary from "./components/OrderSummary";
import Register from "./pages/Register";


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/products" element={<Layout><Products /></Layout>} />
        <Route path="/cart" element={<Layout><Cart /></Layout>} />
        <Route path="/products/:id" element={<Layout><ProductDetail /></Layout>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/ordersummary" element={<Layout><OrderSummary /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;