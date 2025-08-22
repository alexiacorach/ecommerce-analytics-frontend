import { Outlet } from "react-router-dom";
import SidebarAdmin from "./SidebarAdmin";

const LayoutAdmin = () => {
  return (
    <div style={{ display: "flex" }}>
      <SidebarAdmin />
      <main style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutAdmin;
