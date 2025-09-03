import { NavLink } from "react-router-dom";

const SidebarAdmin = () => {
  return (
    <aside className="d-flex flex-column p-3" style={{ backgroundColor: "#2c0261", width: "220px", minHeight: "100vh" }}>
      <h2 className="text-white mb-4">ADMIN PANEL</h2>
      <nav className="nav nav-pills flex-column">
        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            `nav-link ${isActive ? "bg-light text-dark" : "text-white"}`
          }
        >
          Orders
        </NavLink>
        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            `nav-link ${isActive ? "bg-light text-dark" : "text-white"}`
          }
        >
          Products
        </NavLink>
        <NavLink
          to="/admin/analytics"
          className={({ isActive }) =>
            `nav-link ${isActive ? "bg-light text-dark" : "text-white"}`
          }
        >
          Statistics
        </NavLink>
      </nav>
    </aside>
  );
};

export default SidebarAdmin;


