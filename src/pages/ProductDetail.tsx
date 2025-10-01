import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  description?: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); //  URL id
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://54.90.190.57:5000/api/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItemIndex = cart.findIndex(
      (item: any) => item._id === product!._id
    );

    if (existingItemIndex >= 0) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product?.name} added to cart!`);
  };

  if (loading) return <p>Loading product...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="container my-4">
      <div className="row">
        {/* Imagen */}
        <div className="col-md-6 mb-3">
          <img
            src={`https://via.placeholder.com/500x400?text=${product.name}`}
            alt={product.name}
            className="img-fluid rounded shadow-sm"
          />
        </div>

        {/* Detalles */}
        <div className="col-md-6 d-flex flex-column">
          <h1 className="mb-3">{product.name}</h1>
          <p className="text-muted mb-1">Category: {product.category}</p>
          <p className="mb-1">Price: <strong>${product.price}</strong></p>
          <p className="mb-3">Stock: {product.stock}</p>
          {product.description && <p className="mb-3">{product.description}</p>}

          <div className="d-flex align-items-center mb-3">
            <label htmlFor="quantity" className="me-2 mb-0">Quantity:</label>
            <input
              id="quantity"
              type="number"
              min={1}
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="form-control w-25"
            />
          </div>

          <button
            onClick={handleAddToCart}
            className="btn mt-auto text-white"
            style={{
              backgroundColor: "#8b5cf6",
              borderColor: "#8b5cf6",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#a78bfa")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#8b5cf6")}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
