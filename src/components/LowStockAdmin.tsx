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
        `http://localhost:5000/api/analytics/low-stock?threshold=${threshold}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching low stock products:", error);
      alert("Error fetching low stock products");
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-2xl">
      <h2 className="text-xl font-semibold mb-4">⚠️ Low Stock Products</h2>

      <div className="flex gap-4 mb-4 items-end">
        <div>
          <label className="block text-sm">Stock Threshold</label>
          <input
            type="number"
            min={1}
            value={threshold}
            onChange={(e) => setThreshold(parseInt(e.target.value))}
            className="border rounded p-1"
          />
        </div>
        <button
          onClick={fetchLowStock}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Load Products
        </button>
      </div>

      {products.length > 0 ? (
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Stock</th>
              <th className="p-2 border">Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td className="p-2 border">{product.name}</td>
                <td className="p-2 border">{product.stock}</td>
                <td className="p-2 border">${product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products found with stock below {threshold}.</p>
      )}
    </div>
  );
};
