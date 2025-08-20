import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-900 text-white">
      {/* Logo / Brand */}
      <Link to="/" className="text-2xl font-bold">
        Ecommerce
      </Link>

      {/* Navigation Links */}
      <div className="flex space-x-6">
        <Link to="/" className="hover:text-gray-300">
          Home
        </Link>

        <Link to="/products" className="hover:text-gray-300">
          Products
        </Link>

        <Link to="/cart" className="hover:text-gray-300 flex items-center">
          <ShoppingCart className="w-5 h-5 mr-1" /> Cart
        </Link>

        <Link to="/login" className="hover:text-gray-300">
          Login
        </Link>

      </div>
    </nav>
  );
};

export default Navbar;