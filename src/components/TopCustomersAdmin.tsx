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

interface TopCustomer {
  _id: {
    _id: string;
    name: string;
    email: string;
  };
  totalSpent: number;
  totalOrders: number;
}

export const TopCustomersAdmin: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  const fetchTopCustomers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/analytics/top-customers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // mapear la respuesta a la estructura que Recharts espera
      const formattedData = res.data.map((d: TopCustomer) => ({
        name: d._id.name,
        totalSpent: d.totalSpent,
        totalOrders: d.totalOrders,
      }));

      setData(formattedData);
    } catch (error) {
      console.error("Error fetching top customers:", error);
      alert("Error fetching top customers");
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-2xl">
      <h2 className="text-xl font-semibold mb-4">🏆 Top Customers</h2>
      <button
        onClick={fetchTopCustomers}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Load Top Customers
      </button>

      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" orientation="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="totalSpent" fill="#8884d8" name="Total Spent ($)" />
            <Bar yAxisId="right" dataKey="totalOrders" fill="#82ca9d" name="Total Orders" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p>No data yet. Click "Load Top Customers" to fetch.</p>
      )}
    </div>
  );
};

