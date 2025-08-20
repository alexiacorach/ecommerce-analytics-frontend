import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
  }, []);

  const handleQuantityChange = (_id: string, quantity: number) => {
    const updatedCart = cartItems.map((item) =>
      item._id === _id ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleRemoveItem = (_id: string) => {
    const updatedCart = cartItems.filter((item) => item._id !== _id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    try {
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
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // send token
          },
        }
      );

      alert("Order created successfully!");
      console.log("Order: ", res.data);

      //empty cart
      localStorage.removeItem("cart");
      setCartItems([]);

      navigate("/ordersummary");
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Something went wrong during checkout.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <p>
        Click here to see all your Orders.
        <Link to="/ordersummary">My Orders</Link>
      </p>
      {cartItems.length === 0 ? (
        <p>
          Your cart is empty. <Link to="/products">Go shopping</Link>
        </p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item._id} className="flex justify-between mb-2">
              <span>{item.name}</span>
              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) =>
                  handleQuantityChange(item._id, parseInt(e.target.value))
                }
                className="border p-1 w-16"
              />
              <span>${item.price * item.quantity}</span>
              <button
                onClick={() => handleRemoveItem(item._id)}
                className="text-red-500 ml-2"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-4 font-bold">Total: ${total}</div>
          <button
            onClick={handleCheckout}
            className="mt-2 bg-blue-500 text-white p-2 rounded"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
