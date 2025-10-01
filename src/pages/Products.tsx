import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import { Link } from "react-router-dom";

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
}

const Product: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://54.90.190.57/api/products");
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;

return (
    <div className="container my-4">
      <h2 className="mb-4">Products</h2>
      <div className="row g-4">
        {products.map((product) => (
          <div key={product._id} className="col-sm-6 col-md-4 col-lg-3">
            <Link to={`/products/${product._id}`} className="text-decoration-none">
              <ProductCard
                id={product._id}
                name={product.name}
                category={product.category}
                price={product.price}
                stock={product.stock}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
