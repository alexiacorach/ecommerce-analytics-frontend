import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


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
  
  
   return (
    <div className="container my-4">
      <h1 className="mb-4">Your Cart</h1>
      <p>
        Click here to see all your Orders:{" "}
        <Link to="/ordersummary">My Orders</Link>
      </p>

      {cartItems.length === 0 ? (
        <p>
          Your cart is empty. <Link to="/products">Go shopping</Link>
        </p>
      ) : (
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Product</th>
                <th style={{ width: "120px" }}>Quantity</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item._id, parseInt(e.target.value))
                      }
                      className="form-control"
                    />
                  </td>
                  <td>${item.price * item.quantity}</td>
                  <td>
                    <button
                      onClick={() => handleRemoveItem(item._id)}
                      className="btn btn-outline-danger btn-sm"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-between align-items-center mt-4">
            <h5>Total: ${total}</h5>
            <button
              onClick={() => navigate("/checkout")}
              className="btn text-white"
              style={{
                backgroundColor: "#8b5cf6",
                borderColor: "#8b5cf6",
                transition: "background-color 0.3s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#a78bfa")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#8b5cf6")}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
