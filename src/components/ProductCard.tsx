import React from "react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  stock,
  category,
}) => {
  return (
    <div className="border rounded p-4 shadow-sm">
      <h3 className="font-bold">{name}</h3>
      <p>Category: {category}</p>
      <p>Price: ${price}</p>
      <p>Stock: {stock}</p>
      <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard