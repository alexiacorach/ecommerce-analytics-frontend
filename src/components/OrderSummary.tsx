import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const OrderSummary = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to see your orders");
        return;
      }

      const res = await axios.get("http://54.90.190.57:5000/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancel = async (orderId: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://54.90.190.57:5000/api/orders/${orderId}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Order canceled successfully!");
      fetchOrders();
    } catch (error) {
      console.error("Error canceling order:", error);
      alert("Could not cancel the order.");
    }
  };

  if (loading) return <p>Loading your orders...</p>;

  if (orders.length === 0) return <p>No orders yet.</p>;

 return (
    <div className="container my-4">
      <h2 className="mb-4">Your Orders</h2>
      <div className="row g-4">
        {orders.map((order) => (
          <div key={order._id} className="col-12">
            <div className="card shadow-sm">
              <div className="card-body">
                <p><strong>Order ID:</strong> {order._id}</p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={`badge ${order.status === "pending" ? "bg-warning text-dark" : "bg-success"}`}>
                    {order.status}
                  </span>
                </p>
                <p><strong>Total:</strong> ${order.total}</p>

                <ul className="list-group list-group-flush mb-3">
                  {order.items.map((item: { product?: { name: string }; quantity: number; price: number }, index: number) => (
                    <li key={index} className="list-group-item px-0">
                      {item.product?.name} - {item.quantity} x ${item.price}
                    </li>
                  ))}
                </ul>

                <div className="d-flex justify-content-between align-items-center flex-wrap">
                  <Link
                    to={`/orders/${order._id}`}
                    className="text-decoration-none"
                    style={{ color: "#8b5cf6" }} // purple-500
                  >
                    View Details
                  </Link>

                  {order.status === "pending" && (
                    <button
                      onClick={() => handleCancel(order._id)}
                      className="btn btn-outline-danger btn-sm"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default OrderSummary;
