import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

const CheckoutForm: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
    const cartTotal = cart.reduce(
      (acc: number, item: CartItem) => acc + item.price * item.quantity,
      0
    );
    setTotal(cartTotal);
  }, []);

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCartItems([]);
    setTotal(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!street || !city || !state || !postalCode || !country) {
      alert("Please provide all shipping address details.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to checkout");
        return;
      }

      const res = await axios.post(
        `${API_URL}/api/orders`,
        {
          items: cartItems.map((item) => ({
            product: item._id,
            quantity: item.quantity,
          })),
          total,
          shippingAddress: {
            street,
            city,
            state,
            postalCode,
            country,
          },
          paymentInfo: {
            method: paymentMethod,
            status: "pending",
          },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Order created successfully!");
      clearCart();
      navigate(`/orders/${res.data.order._id}`);
    } catch (err) {
      console.error("Error creating order:", err);
      alert("Something went wrong during checkout.");
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className="container my-4">
      <div className="card shadow-sm p-4">
        <h2 className="text-xl font-bold mb-3" style={{ color: "#8b5cf6" }}>Shipping & Payment</h2>

        <div className="row g-3">
          <div className="col-12 col-md-6">
            <label className="form-label">Street</label>
            <input
              type="text"
              className="form-control"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="Street"
              required
            />
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label">City</label>
            <input
              type="text"
              className="form-control"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              required
            />
          </div>

          <div className="col-12 col-md-4">
            <label className="form-label">State</label>
            <input
              type="text"
              className="form-control"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="State"
              required
            />
          </div>

          <div className="col-12 col-md-4">
            <label className="form-label">Postal Code</label>
            <input
              type="text"
              className="form-control"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="Postal Code"
              required
            />
          </div>

          <div className="col-12 col-md-4">
            <label className="form-label">Country</label>
            <input
              type="text"
              className="form-control"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country"
              required
            />
          </div>

          <div className="col-12">
            <label className="form-label">Payment Method</label>
            <select
              className="form-select"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="credit_card">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="cash_on_delivery">Cash on Delivery</option>
            </select>
          </div>
        </div>

        <div className="mt-3 fw-bold">Total: ${total}</div>

        <button
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
          className="btn"
          style={{
            backgroundColor: "#8b5cf6", 
            color: "white",
            marginTop: "10px",
          }}
        >
          {loading ? "Processing..." : "Place Order"}
        </button>
      </div>
    </div>
  );
};

export default CheckoutForm;

