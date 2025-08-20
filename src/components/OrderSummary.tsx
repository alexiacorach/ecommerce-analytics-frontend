import { useEffect, useState } from "react";
import axios from "axios";

const OrderSummary = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("You must be logged in to see your orders");
          return;
        }

        const res = await axios.get("http://localhost:5000/api/orders", {
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

    fetchOrders();
  }, []);
  if (loading) return <p>Loading your orders...</p>;

  if (orders.length === 0) return <p>No orders yet.</p>;

  return (
    <div>
      <h2>Your Orders</h2>
      {orders.map((order) => (
        <div
          key={order._id}
          style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}
        >
          <p>
            <strong>Order ID:</strong> {order._id}
          </p>
          <p>
            <strong>Status:</strong> {order.status}
          </p>
          <p>
            <strong>Total:</strong> ${order.total}
          </p>
          <ul>
            {order.items.map((item: any, index: number) => (
              <li key={index}>
                {item.product?.name} - {item.quantity} x ${item.price}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
export default OrderSummary;
