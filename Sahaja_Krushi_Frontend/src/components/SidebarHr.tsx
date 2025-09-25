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
  User,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const HRSidebar = () => {
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
              onClick={() => navigate("/hr/dashboard")}
            />
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-gray-800 [&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-gray-500">
          {/* Overview Section */}
          <div className="px-4 py-3">
            <h2 className="text-xs font-semibold text-gray-400 uppercase">
              OVERVIEW
            </h2>
          </div>
          <ul className="mt-2 space-y-1 px-2">
            <li>
              <NavLink
                to="/hr/dashboard"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <LayoutDashboard size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/hr/info"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">My Profile</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/hr/attendance"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <ClipboardList size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Attendance</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/hr/time-sheet"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FileSpreadsheet size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Time Sheet</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/hr/leaves"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <CalendarClock size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Leaves</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/hr/overtime"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Timer size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Overtime</span>
              </NavLink>
            </li>
          </ul>

          {/* Admin-like Features Section */}
          <div className="px-4 py-3 mt-4">
            <h2 className="text-xs font-semibold text-gray-400 uppercase">
              OPERATIONS
            </h2>
          </div>
          <ul className="space-y-1 px-2">
            <li>
              <NavLink
                to="/hr/hr-management/employees"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Users size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Employees</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/hr/hr-management/attendance"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <ClipboardList size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Attendance</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/hr/hr-management/shift-management"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Timer size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Shifts</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/hr/hr-management/time-sheet"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FileSpreadsheet size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Time Sheet</span>
              </NavLink>
            </li>

            {/* <li>
              <NavLink
                to="/hr/branches"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <GitBranch size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Branches</span>
              </NavLink>
            </li> */}

            <li>
              <NavLink
                to="/hr/hr-management/leaves"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <CalendarClock size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Leaves</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/hr/hr-management/overtime"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Timer size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Overtime</span>
              </NavLink>
            </li>
          </ul>

          {/* Settings & Configuration */}
          <div className="px-4 py-3 mt-4">
            <h2 className="text-xs font-semibold text-gray-400 uppercase">
              SETTINGS & CONFIGURATIONS
            </h2>
          </div>
          <ul className="space-y-1 px-2">
            <li>
              <NavLink
                to="/hr/hr-management/assets-management"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Laptop size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Assets</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/hr/hr-management/departments"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Building2 size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Departments</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/hr/hr-management/designations"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <BadgeCheck size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Designations</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/hr/hr-management/leavePolicy"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <PlusCircle size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Leave Policies</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/hr/hr-management/holidays"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <CalendarDays size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Holidays</span>
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

export default HRSidebar;
