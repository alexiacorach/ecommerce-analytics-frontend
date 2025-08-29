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
     <div className="p-6 bg-white shadow rounded-2xl">
      <h2 className="text-xl font-semibold mb-4">📊 Sales per Period</h2>

      {/* Filtros */}
      <div className="flex gap-4 mb-6">
        <div>
          <label className="block text-sm">Start Date </label>
          <input
            type="date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="border rounded p-1"
          />
        </div>
        <div>
          <label className="block text-sm">End Date </label>
          <input
            type="date"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="border rounded p-1"
          />
        </div>
        <div>
          <label className="block text-sm">Group by </label>
          <select
            value={groupBy}
            onChange={(e) => setGroupBy(e.target.value)}
            className="border rounded p-1"
          >
            <option value="day">Day</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
          </select>
        </div>
        <button
          onClick={fetchSales}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {/* Gráfico */}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={sales}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="totalSales" stroke="#8884d8" name="Sales ($)" />
          <Line type="monotone" dataKey="totalOrders" stroke="#82ca9d" name="Orders" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
};
