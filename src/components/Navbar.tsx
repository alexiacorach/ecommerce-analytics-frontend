import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const Navbar: React.FC = () => {
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#ddd6fe" }}
    >
      <div className="container-fluid">
        {/* Logo / Brand */}
        <Link className="navbar-brand black" to="/">
          Ecommerce
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                } text-white`}
                aria-current={location.pathname === "/" ? "page" : undefined}
                to="/"
              >
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/products" ? "active" : ""
                } text-white`}
                aria-current={
                  location.pathname === "/products" ? "page" : undefined
                }
                to="/products"
              >
                Products
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/cart" ? "active" : ""
                } text-white`}
                aria-current={
                  location.pathname === "/cart" ? "page" : undefined
                }
                to="/cart"
              >
                Cart <ShoppingCart /> 
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/login" ? "active" : ""
                } text-white`}
                aria-current={
                  location.pathname === "/login" ? "page" : undefined
                }
                to="/login"
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
