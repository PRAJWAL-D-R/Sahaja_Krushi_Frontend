import {
  LayoutDashboard,
  User,
  Users,
  FileSpreadsheet,
  ClipboardList,
  CalendarClock,
  CalendarDays,
  Menu,
  X,
  Timer,
  UserCheck,
  ChartBar,
  MessageSquare,
  FileCheck,
  Briefcase,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const ManagerSidebar = () => {
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
              onClick={() => navigate("/manager/dashboard")}
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
          <ul className="space-y-1 px-2">
            <li>
              <NavLink
                to="/manager/dashboard"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <LayoutDashboard size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Dashboard</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/manager/info"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">My Profile</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/manager/attendance"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <ClipboardList size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">My Attendance</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/manager/time-sheet"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FileSpreadsheet size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">My Time Sheet</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/manager/overtime"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Timer size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">My Overtime</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/manager/leaves"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <CalendarClock size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">My Leaves</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/manager/holidays"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <CalendarDays size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Holidays</span>
              </NavLink>
            </li>
          </ul>

          <div className="px-4 py-3 mt-4">
            <h2 className="text-xs font-semibold text-gray-400 uppercase">
              TEAM MANAGEMENT
            </h2>
          </div>
          <ul className="space-y-1 px-2">
            <li>
              <NavLink
                to="/manager/team/employees"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Users size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">My Team</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/manager/team/attendance"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <UserCheck size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Team Attendance</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/manager/team/time-sheet"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <ChartBar size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Team Time Sheet</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/manager/team/leaves"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FileCheck size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Leave Requests</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/manager/team/overtime"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Briefcase size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Overtime Request</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/manager/team/shift-management"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Briefcase size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Shifts</span>
              </NavLink>
            </li>

            {/* <li>
              <NavLink
                to="/manager/team/team-communication"
                className={linkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <MessageSquare size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Team Communication</span>
              </NavLink>
            </li> */}
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

export default ManagerSidebar;
