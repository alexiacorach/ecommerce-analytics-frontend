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
      const res = await axios.get("http://54.90.190.57:5000/api/analytics/top-customers", {
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
    <div className="container-fluid">
      <div className="card shadow rounded-4 mb-4">
        <div className="card-header bg-dark text-white">
          🏆 Top Customers
        </div>
        <div className="card-body">
          <button
            onClick={fetchTopCustomers}
            className="btn btn-primary mb-3"
          >
            Load Top Customers
          </button>

          {data.length > 0 ? (
            <div style={{ width: "100%", height: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="totalSpent" fill="#4B0082" name="Total Spent ($)" />
                  <Bar yAxisId="right" dataKey="totalOrders" fill="#FF00FF" name="Total Orders" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p>No data yet. Click "Load Top Customers" to fetch.</p>
          )}
        </div>
      </div>
    </div>
  );
};

