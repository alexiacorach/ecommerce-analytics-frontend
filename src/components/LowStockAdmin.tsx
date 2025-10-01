import React, { useState } from "react";
import axios from "axios";

interface LowStockProduct {
  _id: string;
  name: string;
  stock: number;
  price: number;
}

export const LowStockAdmin: React.FC = () => {
  const [threshold, setThreshold] = useState(5);
  const [products, setProducts] = useState<LowStockProduct[]>([]);

  const fetchLowStock = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://54.90.190.57/api/analytics/low-stock?threshold=${threshold}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching low stock products:", error);
      alert("Error fetching low stock products");
    }
  };

return (
    <div className="card mt-4 shadow">
      <div className="card-header bg-dark text-white">
        <h5 className="mb-0">⚠️ Low Stock Products</h5>
      </div>
      <div className="card-body">
        <div className="row g-2 mb-3 align-items-end">
          <div className="col-auto">
            <label className="form-label">Stock Threshold</label>
            <input
              type="number"
              min={1}
              value={threshold}
              onChange={(e) => setThreshold(parseInt(e.target.value))}
              className="form-control"
            />
          </div>
          <div className="col-auto">
            <button
              onClick={fetchLowStock}
              className="btn btn-dark"
            >
              Load Products
            </button>
          </div>
        </div>

        {products.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Stock</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{product.stock}</td>
                    <td>${product.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No products found with stock below {threshold}.</p>
        )}
      </div>
    </div>
  );
};
