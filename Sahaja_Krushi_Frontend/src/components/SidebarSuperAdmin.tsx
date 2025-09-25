import {
  LayoutDashboard,
  Users,
  Building2,
  BadgeCheck,
  Menu,
  X,
  CalendarClock,
  CalendarDays,
  FileSpreadsheet,
  ClipboardList,
  PlusCircle,
  Laptop,
  Timer,
  Building,
  Settings,
  BarChart3,
  Mail,
  Shield,
  GitBranch,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const SuperAdminSidebar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 font-medium transition-all duration-200 rounded ${
      isActive
        ? "bg-orange-600 text-white"
        : "text-[#A6A6A6] hover:bg-gray-700 hover:text-white"
    }`;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-1.5 bg-gray-900 text-white rounded-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside
        className={`fixed top-12 lg:top-0 lg:static h-full w-64 flex flex-col bg-gray-900 text-white transform transition-transform duration-300 ease-in-out z-30 ${
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo Section */}
        <div className="p-2 border-b border-gray-700">
          <div className="flex justify-center items-center max-w-[100px] mx-auto">
            <img
              src="/images/company_logo.png"
              className="rounded block w-full cursor-pointer"
              alt="Company Logo"
              onClick={() => navigate("/super-admin/dashboard")}
            />
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-gray-800 [&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-gray-500">
          <div className="px-4 py-3">
            <h2 className="text-xs font-semibold text-gray-400 uppercase">
              OVERVIEW
            </h2>
          </div>
          <ul className="mt-2 space-y-1 px-2">
            <li>
              <NavLink
                to="/super-admin/dashboard"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <LayoutDashboard size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Dashboard</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/super-admin/companies"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Building size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Companies</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/super-admin/branches"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <GitBranch size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Branches</span>
              </NavLink>
            </li>

            {/* <li>
              <NavLink
                to="/super-admin/company-settings"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Settings size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Company Settings</span>
              </NavLink>
            </li> */}

            {/* <li>
              <NavLink
                to="/super-admin/reports"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <BarChart3 size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Reports & Analytics</span>
              </NavLink>
            </li> */}

            {/* <li>
              <NavLink
                to="/super-admin/notifications"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Mail size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Notifications</span>
              </NavLink>
            </li> */}

            {/* <li>
              <NavLink
                to="/super-admin/roles"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Shield size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Roles & Permissions</span>
              </NavLink>
            </li> */}

            <li className="py-2">
              <div className="h-px bg-gray-700"></div>
            </li>

            <li>
              <NavLink
                to="/super-admin/departments"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Building2 size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Global Departments</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/super-admin/designations"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <BadgeCheck size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">
                  Global Designations
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/super-admin/employees"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Users size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Global Employees</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/super-admin/leavePolicy"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <PlusCircle size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">
                  Global Leave Policies
                </span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/super-admin/holidays"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <CalendarDays size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Global Holidays</span>
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Powered By Section */}
        <div className="p-4 border-t border-gray-700 mt-auto">
          <p className="text-center text-sm text-gray-400">
            Powered By{" "}
            <span className="font-semibold text-orange-500">Qreams</span>
          </p>
        </div>
      </aside>
    </>
  );
};

export default SuperAdminSidebar;
