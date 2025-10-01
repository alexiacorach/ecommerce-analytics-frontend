import { useEffect, useState } from "react";
import axios from "axios";

const AdminOrders = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    //get all orders
    const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://54.90.190.57:5000/api/orders/all", {
        headers: { Authorization: `Bearer ${token}` },
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

  //update order status
  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://54.90.190.57:5000/api/orders/${orderId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Order status updated!");
      fetchOrders(); //refresh
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Could not update status");
    }
  };

  if (loading) return <p>Loading orders...</p>;


  return (
    <div className="vh-100 overflow-auto p-3">
      <h2 className="mb-4">Admin Orders Panel</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Customer</th>
                <th>Email</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Change Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.customer?.name}</td>
                  <td>{order.customer?.email}</td>
                  <td>
                    {order.items.map((item: any) => (
                      <div key={item._id}>
                        {item.product?.name} x {item.quantity}
                      </div>
                    ))}
                  </td>
                  <td>
                    $
                    {order.items.reduce(
                      (sum: number, item: any) =>
                        sum + item.product.price * item.quantity,
                      0
                    )}
                  </td>
                  <td>{order.status}</td>
                  <td>
                    <select
                      className="form-select"
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="canceled">Canceled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;