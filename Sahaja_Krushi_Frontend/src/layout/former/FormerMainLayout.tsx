import { Outlet } from "react-router-dom";
import AdminDashboardNavbar from "../../components/Navbar";

const FormerMainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AdminDashboardNavbar/>
      <main className="flex-1 p-4 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default FormerMainLayout;
