import { Link } from "react-router-dom";

const SidebarAdmin = () => {
  return (
    <aside
      style={{
        width: "220px",
        minHeight: "100vh",
        background: "#f4f4f4",
        padding: "20px",
      }}
    >
      <h2>Admin</h2>
      <nav>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            <Link to="/admin/orders">Orders</Link>
          </li>
          <li>
            <Link to="/admin/products">Products</Link>
          </li>
          <li>
            <Link to="/admin/analytics">Statistics</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SidebarAdmin;
