import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

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
        `${API_URL}/api/products`,
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
<div className="container py-4">
  <div className="card mx-auto" style={{ maxWidth: "500px" }}>
    <div className="card-header bg-dark text-white">
      <h5 className="mb-0">Create New Product</h5>
    </div>
    <div className="card-body">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Product Name:</label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Product Category:</label>
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Product Price:</label>
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Product Stock:</label>
          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            className="form-control"
          />
        </div>

        <button
          type="submit"
          className="btn btn-dark w-100"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  </div>
</div>
  );
};

export default AdminCreateProduct;
