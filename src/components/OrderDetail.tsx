import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to see order details");
        return;
      }
      const res = await axios.get(`http://localhost:5000/api/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrder(res.data);
    } catch (error) {
      console.error("Error fetching order", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePay = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.put(
        `http://localhost:5000/api/orders/${id}/pay`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Payment simulated successfully!");
      fetchOrder(); // refresca detalles
    } catch (error) {
      console.error("Error paying order", error);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  if (loading) return <p>Loading order details...</p>;
  if (!order) return <p>Order not found</p>;

  const {shippingAddress} = order;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Order Detail</h2>
      <p><strong>Order ID:</strong> {order._id}</p>
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Total:</strong> ${order.total}</p>
      <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
      <h3 className="mt-4 font-semibold">Shipping Address</h3>
      {shippingAddress ? (
        <div className="ml-2">
          <p><strong>Street: </strong>{shippingAddress.street}</p>
          <p><strong>City: </strong>{shippingAddress.city}, {shippingAddress.state}</p>
          <p><strong>Postal Code: </strong>{shippingAddress.postalCode}</p>
          <p><strong>Country: </strong>{shippingAddress.country}</p>
        </div>
      ) : (
        <p>Not provided</p>
      )}

      <h3 className="mt-4 font-semibold">Payment Info</h3>
      <p><strong>Method:</strong> {order.paymentInfo?.method || "Not provided"}</p>
      <p><strong>Status:</strong> {order.paymentInfo?.status || "Pending"}</p>

      {order.paymentInfo?.status !== "paid" && (
        <button
          onClick={handlePay}
          className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Simulate Payment
        </button>
      )}

      <h3 className="mt-4 font-semibold">Items</h3>
      <ul>
        {order.items.map((item: any, index: number) => (
          <li key={index}>
            {item.product?.name} - {item.quantity} x ${item.price}
          </li>
        ))}
      </ul>

      <Link to="/ordersummary" className="mt-4 inline-block text-blue-500 underline">
        Back to Orders
      </Link>
    </div>
  );
};

export default OrderDetail;

