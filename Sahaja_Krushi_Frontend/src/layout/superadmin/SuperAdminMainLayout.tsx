import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Crown, LogOut, Users, Home, BarChart3, Wheat, UserPlus } from "lucide-react";
import { logout } from "../../store/feature/Auth/AuthSlice";
import type { RootState } from "../../store";

const SuperAdminMainLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  const isSuperAdmin = user?.role === 'SUPER_ADMIN';

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login");
  };

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/superadmin/home" },
    { icon: Users, label: "Admin Management", path: "/superadmin/admin-management" },
    { icon: UserPlus, label: "Create Admin", path: "/superadmin/create-admin" },
    { icon: Users, label: "Farmers Management", path: "/superadmin/farmers" },
    // { icon: BarChart3, label: "Analytics", path: "/superadmin/analytics" },
    { icon: Wheat, label: "News", path: "/superadmin/about" },
  ];

  if (!isSuperAdmin) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white p-10 rounded-lg shadow-xl border border-gray-200">
          <Crown className="w-20 h-20 text-red-600 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Access Denied</h2>
          <p className="text-gray-600 mb-8 text-lg">You don't have super admin privileges</p>
          <button
            onClick={() => navigate("/auth/login")}
            className="px-8 py-3 bg-indigo-700 text-white rounded-md hover:bg-indigo-800 font-semibold text-lg shadow-lg transition-all duration-200"
          >
            Go to Super Admin Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-green-50">
      {/* Sidebar */}
      <div className="w-72 bg-green-800 shadow-2xl flex flex-col border-r border-green-300">
        {/* Header */}
        <div className="p-6 border-b border-green-700 bg-gradient-to-r from-green-800 to-green-700">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Crown className="w-7 h-7 text-green-700" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">ಸಹಜ ಕೃಷಿ</h1>
              {/* <p className="text-sm text-green-200 font-medium">Super Admin Portal</p> */}
               <p className="text-sm font-semibold text-white truncate">
                {user?.username}
              </p>
              <p className="text-xs text-green-300 truncate">
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        {/* User Info */}
        {/* <div className="p-5 border-b border-green-700 bg-green-750">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
              <Crown className="w-5 h-5 text-green-700" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">
                {user?.username}
              </p>
              <p className="text-xs text-green-300 truncate">
                {user?.email}
              </p>
            </div>
          </div>
        </div> */}

        {/* Navigation */}
        <nav className="flex-1 p-5 space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center space-x-4 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-white text-green-700 shadow-lg transform scale-105 border border-green-200"
                    : "text-green-200 hover:bg-green-700 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-5 border-t border-slate-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-4 px-4 py-3 rounded-lg text-sm font-semibold text-red-100 hover:bg-red-700 hover:text-red-100 transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SuperAdminMainLayout;