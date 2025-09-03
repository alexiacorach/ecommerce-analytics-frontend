import { Outlet } from "react-router-dom";
import SidebarAdmin from "./SidebarAdmin";

const LayoutAdmin = () => {
  return (
    <div className="d-flex min-vh-100">
      {/* Sidebar */}
      <SidebarAdmin />

      {/* Main content */}
      <main className="flex-fill overflow-auto bg-light">
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutAdmin;
