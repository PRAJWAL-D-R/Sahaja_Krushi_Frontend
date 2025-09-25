import {
  LayoutDashboard,
  User,
  FileSpreadsheet,
  ClipboardList,
  CalendarClock,
  CalendarDays,
  Menu,
  X,
  Timer,
  Briefcase,
  MessageSquare,
  Users,
  FileCheck,
  Bell,
  Laptop,
  FileText,
  Settings,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const EmployeeSidebar = () => {
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
              onClick={() => navigate("/employee/dashboard")}
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
          <ul className="space-y-1 px-2">
            <li>
              <NavLink
                to="/employee/dashboard"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <LayoutDashboard size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Dashboard</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/employee/info"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">My Profile</span>
              </NavLink>
            </li>

            {/* <li>
              <NavLink
                to="/employee/notifications"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Bell size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Notifications</span>
              </NavLink>
            </li> */}
          </ul>

          {/* Time & Attendance Section */}
          <div className="px-4 py-3 mt-4">
            <h2 className="text-xs font-semibold text-gray-400 uppercase">
              Time & Attendance
            </h2>
          </div>
          <ul className="space-y-1 px-2">
            <li>
              <NavLink
                to="/employee/attendance"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <ClipboardList size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Attendance</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/employee/time-sheet"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FileSpreadsheet size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Time Sheet</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/employee/overtime"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Timer size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Overtime</span>
              </NavLink>
            </li>
          </ul>

          {/* Leave Management Section */}
          <div className="px-4 py-3 mt-4">
            <h2 className="text-xs font-semibold text-gray-400 uppercase">
              Leave Management
            </h2>
          </div>
          <ul className="space-y-1 px-2">
            <li>
              <NavLink
                to="/employee/leaves"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <CalendarClock size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">My Leaves</span>
              </NavLink>
            </li>

            {/* <li>
              <NavLink
                to="/employee/leave-calendar"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <CalendarDays size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Leave Calendar</span>
              </NavLink>
            </li> */}

            <li>
              <NavLink
                to="/employee/holidays"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <CalendarDays size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Holidays</span>
              </NavLink>
            </li>
          </ul>

          {/* Work Section */}
          {/* <div className="px-4 py-3 mt-4">
            <h2 className="text-xs font-semibold text-gray-400 uppercase">
              Work
            </h2>
          </div> */}
          {/* <ul className="space-y-1 px-2">
            <li>
              <NavLink
                to="/employee/tasks"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Briefcase size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">My Tasks</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/employee/team"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Users size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">My Team</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/employee/assets"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Laptop size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">My Assets</span>
              </NavLink>
            </li>
          </ul> */}

          {/* Additional Section */}
          {/* <div className="px-4 py-3 mt-4">
            <h2 className="text-xs font-semibold text-gray-400 uppercase">
              Additional
            </h2>
          </div> */}
          {/* <ul className="space-y-1 px-2 mb-4">
            <li>
              <NavLink
                to="/employee/documents"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FileText size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Documents</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/employee/requests"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FileCheck size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Requests</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/employee/communication"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <MessageSquare size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Communication</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/employee/settings"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Settings size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Settings</span>
              </NavLink>
            </li>
          </ul> */}
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

export default EmployeeSidebar;
