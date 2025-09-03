import React, { useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface SaleData {
  _id: { year: number; month?: number; day?: number };
  totalSales: number;
  totalOrders: number;
}

export const SalesChartAdmin: React.FC = () => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [groupBy, setGroupBy] = useState("day");
  const [sales, setSales] = useState<any[]>([]);

  const fetchSales = async () => {
    try {
      const token = localStorage.getItem("token");
        const res = await axios.get(
      `http://localhost:5000/api/analytics/sales?start=${start}&end=${end}&groupBy=${groupBy}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
      const data: SaleData[] = res.data

      //map date
      const formatted = data.map((s) => {
        const { year, month, day } = s._id;
        let label = `${year}`;
        if (month) label += `-${String(month).padStart(2, "0")}`;
        if (day) label += `-${String(day).padStart(2, "0")}`;
        return { ...s, date: label };
      });
      setSales(formatted);
    } catch (err) {
      console.error("Error fetching sales", err);
    }
  };

return (
    <div className="container-fluid">
      <div className="card shadow rounded-4 mb-4">
        <div className="card-header bg-dark text-white">
          📊 Sales per Period
        </div>
        <div className="card-body">
          {/* Filtros */}
          <div className="row g-3 mb-4">
            <div className="col-md-3">
              <label className="form-label">Start Date</label>
              <input
                type="date"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">End Date</label>
              <input
                type="date"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Group by</label>
              <select
                value={groupBy}
                onChange={(e) => setGroupBy(e.target.value)}
                className="form-select"
              >
                <option value="day">Day</option>
                <option value="month">Month</option>
                <option value="year">Year</option>
              </select>
            </div>
            <div className="col-md-3 d-flex align-items-end">
              <button
                onClick={fetchSales}
                className="btn btn-primary w-100"
              >
                Search
              </button>
            </div>
          </div>

          {/* Gráfico */}
          <div style={{ width: "100%", height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="totalSales" stroke="#4B0082" name="Sales ($)" />
                <Line type="monotone" dataKey="totalOrders" stroke="#FF00FF" name="Orders" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
