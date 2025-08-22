import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
      const res = await axios.get("http://localhost:5000/api/products", {
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
      await axios.delete(`http://localhost:5000/api/products/${productId}`, {
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
        `http://localhost:5000/api/products/${editingProductId}`,
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
  <div className="p-4">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold">All Products</h2>
      <Link
        to="/admin/products/create"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Create New Product
      </Link>
    </div>
    <table className="min-w-full border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border">Name</th>
          <th className="p-2 border">Category</th>
          <th className="p-2 border">Price</th>
          <th className="p-2 border">Stock</th>
          <th className="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product._id}>
            {editingProductId === product._id ? (
              <>
                <td className="p-2 border">
                  <input
                    name="name"
                    value={editForm.name}
                    onChange={handleEditChange}
                    className="border px-1 py-0.5 w-full"
                  />
                </td>
                <td className="p-2 border">
                  <input
                    name="category"
                    value={editForm.category}
                    onChange={handleEditChange}
                    className="border px-1 py-0.5 w-full"
                  />
                </td>
                <td className="p-2 border">
                  <input
                    name="price"
                    type="number"
                    value={editForm.price}
                    onChange={handleEditChange}
                    className="border px-1 py-0.5 w-full"
                  />
                </td>
                <td className="p-2 border">
                  <input
                    name="stock"
                    type="number"
                    value={editForm.stock}
                    onChange={handleEditChange}
                    className="border px-1 py-0.5 w-full"
                  />
                </td>
                <td className="p-2 border">
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded mr-2 hover:bg-green-600"
                    onClick={handleUpdate}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500"
                    onClick={() => setEditingProductId(null)}
                  >
                    Cancel
                  </button>
                </td>
              </>
            ) : (
              <>
                <td className="p-2 border">{product.name}</td>
                <td className="p-2 border">{product.category}</td>
                <td className="p-2 border">${product.price}</td>
                <td className="p-2 border">{product.stock}</td>
                <td className="p-2 border">
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                    onClick={() => startEditing(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
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
);
};

export default AdminProducts;
