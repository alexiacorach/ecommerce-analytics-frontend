import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        "http://localhost:5000/api/orders",
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
    <form onSubmit={handleSubmit} className="mt-4 p-4 border rounded bg-gray-50">
      <h2 className="text-lg font-bold mb-2">Shipping & Payment</h2>

      <div className="mb-2">
        <label className="block mb-1">Street:</label>
        <input
          type="text"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          className="w-full border p-2 rounded"
          placeholder="Street"
          required
        />
      </div>

      <div className="mb-2">
        <label className="block mb-1">City:</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full border p-2 rounded"
          placeholder="City"
          required
        />
      </div>

      <div className="mb-2">
        <label className="block mb-1">State:</label>
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="w-full border p-2 rounded"
          placeholder="State"
          required
        />
      </div>

      <div className="mb-2">
        <label className="block mb-1">Postal Code:</label>
        <input
          type="text"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          className="w-full border p-2 rounded"
          placeholder="Postal Code"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Country:</label>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="w-full border p-2 rounded"
          placeholder="Country"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Payment Method:</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="credit_card">Credit Card</option>
          <option value="paypal">PayPal</option>
          <option value="cash_on_delivery">Cash on Delivery</option>
        </select>
      </div>

      <div className="font-bold mb-2">Total: ${total}</div>

      <button
        type="submit"
        disabled={loading}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        {loading ? "Processing..." : "Place Order"}
      </button>
    </form>
  );
};

export default CheckoutForm;

