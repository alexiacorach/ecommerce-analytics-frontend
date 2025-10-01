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
        `http://54.90.190.57/api/analytics/top-products`,
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
    <div className="container-fluid">
      <div className="card shadow rounded-4 mb-4">
        <div className="card-header bg-dark text-white">
          🏆 Top Products
        </div>
        <div className="card-body">
          {/* Filtros */}
          <div className="row g-3 mb-4">
            <div className="col-md-2">
              <label className="form-label">Start Date</label>
              <input
                type="date"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="col-md-2">
              <label className="form-label">End Date</label>
              <input
                type="date"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Optional"
                className="form-control"
              />
            </div>
            <div className="col-md-2">
              <label className="form-label">Limit</label>
              <input
                type="number"
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                className="form-control"
              />
            </div>
            <div className="col-md-3 d-flex align-items-end">
              <button
                onClick={fetchTopProducts}
                className="btn btn-primary w-100"
              >
                Fetch
              </button>
            </div>
          </div>

          {/* Gráfic */}
          {data.length > 0 ? (
            <div style={{ width: "100%", height: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="unitsSold" fill="#4B0082" name="Units Sold" />
                  <Bar yAxisId="right" dataKey="revenue" fill="#FF00FF" name="Revenue ($)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p>No data to display.</p>
          )}
        </div>
      </div>
    </div>
  );
};
