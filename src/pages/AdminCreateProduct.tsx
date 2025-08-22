import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminCreateProduct: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/products",
        { name, category, price, stock },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Product created successfully!");
      console.log("Product: ", res.data);
      navigate("/admin/products");
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Could not create product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Create New Product</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label>
          Product Name:
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border p-2 rounded"
          />
        </label>

        <label>
          Product Category:
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="border p-2 rounded"
          />
        </label>
        <label>
          Product Price:
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
            className="border p-2 rounded"
          />
        </label>
        <label>
          Product Stock:
          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            className="border p-2 rounded"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default AdminCreateProduct;
