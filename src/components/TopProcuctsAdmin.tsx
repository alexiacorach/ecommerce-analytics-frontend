import React, { useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface TopProduct {
  _id: string;
  name: string;
  category: string;
  unitsSold: number;
  revenue: number;
}

export const TopProductsAdmin: React.FC = () => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState(10);
  const [data, setData] = useState<TopProduct[]>([]);

  const fetchTopProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:5000/api/analytics/top-products`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { start, end, category, limit },
        }
      );
      setData(res.data);
    } catch (error) {
      console.error("Error fetching top products:", error);
      alert("Failed to fetch top products.");
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-2xl">
      <h2 className="text-xl font-semibold mb-4">🏆 Top Products</h2>

      {/* Filtros */}
      <div className="flex gap-4 mb-6">
        <div>
          <label className="block text-sm">Start Date</label>
          <input
            type="date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="border rounded p-1"
          />
        </div>
        <div>
          <label className="block text-sm">End Date</label>
          <input
            type="date"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="border rounded p-1"
          />
        </div>
        <div>
          <label className="block text-sm">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Optional"
            className="border rounded p-1"
          />
        </div>
        <div>
          <label className="block text-sm">Limit</label>
          <input
            type="number"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="border rounded p-1 w-16"
          />
        </div>
        <button
          onClick={fetchTopProducts}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Fetch
        </button>
      </div>

      {/* Gráfico */}
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" orientation="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="unitsSold" fill="#8884d8" name="Units Sold" />
          <Bar yAxisId="right" dataKey="revenue" fill="#82ca9d" name="Revenue ($)" />
        </BarChart>
      </ResponsiveContainer>
      ) : (
        <p>No data to display.</p>
      )}
    </div>
  );
};
