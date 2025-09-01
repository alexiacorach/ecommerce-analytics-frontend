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
    <div className="card h-100 shadow-sm">
       <img
        src={`https://via.placeholder.com/300x200?text=${name}`}
        className="card-img-top"
        alt={name}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{name}</h5>
        <p className="card-text mb-1">Category: {category}</p>
        <p className="card-text mb-1">Price: ${price}</p>
        <p className="card-text mb-3">Stock: {stock}</p>
        
       <button
          className="btn mt-auto text-white"
          style={{
            backgroundColor: "#8b5cf6", // purple-500
            borderColor: "#8b5cf6",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#a78bfa")} // purple-400 hover
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#8b5cf6")}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard