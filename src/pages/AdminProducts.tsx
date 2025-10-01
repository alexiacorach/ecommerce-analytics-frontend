import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { LowStockAdmin } from "../components/LowStockAdmin";

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
}

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    category: "",
    price: 0,
    stock: 0,
  });

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://54.90.190.57:5000/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (productId: string) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      const token = localStorage.getItem("token"); // asumiendo auth JWT
      await axios.delete(`http://54.90.190.57:5000/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Product deleted successfully!");
      // actualizar estado local para removerlo de la UI
      setProducts(products.filter((p) => p._id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Could not delete product.");
    }
  };

  const startEditing = (product: Product) => {
    setEditingProductId(product._id);
    setEditForm({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock || 0,
    });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!editingProductId) return;

    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://54.90.190.57:5000/api/products/${editingProductId}`,
        editForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // actualizar lista local
      setProducts(
        products.map((p) => (p._id === editingProductId ? res.data : p))
      );
      setEditingProductId(null);
      alert("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Could not update product.");
    }
  };

  if (loading) return <p>Loading products...</p>;

return (
    <div className="p-4 vh-100 overflow-auto">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">All Products</h2>
        <Link
          to="/admin/products/create"
          className="btn btn-secondary"
        >
          Create New Product
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                {editingProductId === product._id ? (
                  <>
                    <td>
                      <input
                        name="name"
                        value={editForm.name}
                        onChange={handleEditChange}
                        className="form-control form-control-sm"
                      />
                    </td>
                    <td>
                      <input
                        name="category"
                        value={editForm.category}
                        onChange={handleEditChange}
                        className="form-control form-control-sm"
                      />
                    </td>
                    <td>
                      <input
                        name="price"
                        type="number"
                        value={editForm.price}
                        onChange={handleEditChange}
                        className="form-control form-control-sm"
                      />
                    </td>
                    <td>
                      <input
                        name="stock"
                        type="number"
                        value={editForm.stock}
                        onChange={handleEditChange}
                        className="form-control form-control-sm"
                      />
                    </td>
                    <td>
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={handleUpdate}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => setEditingProductId(null)}
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>${product.price}</td>
                    <td>{product.stock}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm text-white me-2"
                        onClick={() => startEditing(product)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(product._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <LowStockAdmin />
    </div>
  );
};

export default AdminProducts;
