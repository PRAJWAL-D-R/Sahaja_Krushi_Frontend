
import { Outlet } from "react-router-dom";

import GovernmentAgricultureNavbar from "../../components/Navbar";

const AdminMainLayout = () => {
  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <GovernmentAgricultureNavbar />
      <main className="flex-1 overflow-auto ">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminMainLayout;
