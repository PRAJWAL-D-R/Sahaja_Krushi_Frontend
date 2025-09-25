import {
  User2,
  Menu,
  X,
  Search,
  Bell,
  ChevronDown,
  Home,
  Cloud,
  FileText,
  History,
  Eye,
  MessageSquare,
  Newspaper,
  UserCircle,
  ExternalLink,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

const FarmerDashboardNavbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showReportsDropdown, setShowReportsDropdown] = useState(false);
  const [showToolsDropdown, setShowToolsDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const reportsRef = useRef(null);
  const toolsRef = useRef(null);
  const notificationRef = useRef(null);
  const userRef = useRef(null);

  const notifications = [
    {
      id: 1,
      message: "Weather alert: Heavy rainfall expected tomorrow",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 2,
      message: "Your crop report has been approved",
      time: "3 hours ago",
      unread: true,
    },
    {
      id: 3,
      message: "New subsidy scheme available for your region",
      time: "1 day ago",
      unread: false,
    },
    {
      id: 4,
      message: "Feedback received on your last submission",
      time: "2 days ago",
      unread: false,
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  const reports = [
    { name: "Submit Report Form", icon: FileText, href: "#submit-report" },
    { name: "Submission History", icon: History, href: "#history" },
    { name: "Submission Details", icon: Eye, href: "#details" },
  ];

  const tools = [
    { name: "Weather Widget", icon: Cloud, href: "#weather" },
    { name: "News Feed", icon: Newspaper, href: "#news" },
    { name: "Quick Links", icon: ExternalLink, href: "#quick-links" },
  ];

  const dashboardSections = [
    { name: "Dashboard", icon: Home, href: "#dashboard", active: true },
    { name: "Profile Summary", icon: UserCircle, href: "#profile" },
    { name: "Feedback", icon: MessageSquare, href: "#feedback" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (reportsRef.current && !reportsRef.current.contains(event.target)) {
        setShowReportsDropdown(false);
      }
      if (toolsRef.current && !toolsRef.current.contains(event.target)) {
        setShowToolsDropdown(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
      if (userRef.current && !userRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const NavLink = ({ href, children, active = false }) => (
    <a
      href={href}
      className={`text-white hover:text-amber-200 transition-colors duration-200 font-medium px-3 py-2 rounded-md hover:bg-white/10 ${
        active ? "bg-white/15 text-amber-200" : ""
      }`}
    >
      {children}
    </a>
  );

  const DropdownItem = ({ icon: Icon, children, href }) => (
    <a
      href={href}
      className="flex items-center space-x-3 px-4 py-3 hover:bg-green-50 transition-colors duration-200 text-gray-700 hover:text-green-700 border-b border-gray-50 last:border-b-0"
    >
      <Icon className="h-4 w-4 text-green-600 flex-shrink-0" />
      <span className="text-sm">{children}</span>
    </a>
  );

  return (
    <nav className="bg-gradient-to-r from-green-700 via-green-600 to-emerald-600 shadow-xl sticky top-0 z-50">
      <div className="bg-green-800/40 backdrop-blur-sm border-b border-green-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2">
            <div className="flex items-center space-x-2 text-green-100 text-sm">
              <User2 className="h-4 w-4" />
              <span>Welcome, Farmer Portal</span>
              <span className="hidden md:inline">| Last Login: Today, 09:30 AM</span>
            </div>
            <div className="text-green-100 text-sm">
              Status: <span className="text-amber-200 font-medium">Active</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 lg:py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-white/15 p-2 rounded-xl border border-white/20">
              <div className="h-6 w-6 text-amber-200" />
            </div>
            <div className="text-white">
              <h1 className="text-xl font-bold">Home</h1>
              <p className="text-sm text-green-100">Agricultural Management System</p>
            </div>
          </div>

          <div className="hidden xl:flex items-center space-x-2">
            {dashboardSections.map((section, index) => (
              <NavLink key={index} href={section.href} active={section.active}>
                <div className="flex items-center space-x-2">
                  <section.icon className="h-4 w-4" />
                  <span>{section.name}</span>
                </div>
              </NavLink>
            ))}

            <div className="relative" ref={reportsRef}>
              <button
                onClick={() => setShowReportsDropdown(!showReportsDropdown)}
                className="flex items-center space-x-1 text-white hover:text-amber-200 font-medium px-3 py-2 rounded-md hover:bg-white/10"
              >
                <span>Reports</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    showReportsDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>
              {showReportsDropdown && (
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 py-1 z-50">
                  <div className="px-4 py-3 border-b bg-gray-50/50">
                    <h3 className="text-sm font-semibold text-gray-800">
                      Report Management
                    </h3>
                  </div>
                  {reports.map((report, index) => (
                    <DropdownItem
                      key={index}
                      icon={report.icon}
                      href={report.href}
                    >
                      {report.name}
                    </DropdownItem>
                  ))}
                </div>
              )}
            </div>

            <div className="relative" ref={toolsRef}>
              <button
                onClick={() => setShowToolsDropdown(!showToolsDropdown)}
                className="flex items-center space-x-1 text-white hover:text-amber-200 font-medium px-3 py-2 rounded-md hover:bg-white/10"
              >
                <span>Tools</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    showToolsDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>
              {showToolsDropdown && (
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 py-1 z-50">
                  <div className="px-4 py-3 border-b bg-gray-50/50">
                    <h3 className="text-sm font-semibold text-gray-800">
                      Farmer Tools
                    </h3>
                  </div>
                  {tools.map((tool, index) => (
                    <DropdownItem
                      key={index}
                      icon={tool.icon}
                      href={tool.href}
                    >
                      {tool.name}
                    </DropdownItem>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative bg-white/15 p-2 rounded-lg border border-white/20"
              >
                <Bell className="h-5 w-5 text-white" />
                {unreadCount > 0 && (
                  <>
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold">
                      {unreadCount}
                    </span>
                    <span className="absolute -top-1 -right-1 bg-red-400 rounded-full h-4 w-4 animate-ping"></span>
                  </>
                )}
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 py-1 z-50">
                  <div className="px-4 py-3 border-b bg-gray-50/50">
                    <h3 className="text-sm font-semibold text-gray-800">
                      Feedback Notifications
                    </h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-l-4 ${
                          notification.unread
                            ? "border-l-green-500 bg-green-50/30"
                            : "border-l-transparent"
                        }`}
                      >
                        <p className="text-sm font-medium text-gray-800">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500">
                          {notification.time}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-3 border-t bg-gray-50/30">
                    <button className="text-sm text-green-600 hover:text-green-700 font-medium">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative" ref={userRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="bg-white/15 p-2 rounded-lg border border-white/20"
              >
                <UserCircle className="h-5 w-5 text-white" />
              </button>
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-200 py-1 z-50">
                  <div className="px-4 py-3 border-b bg-gray-50/50">
                    <p className="text-sm font-semibold text-gray-800">
                      John Farmer
                    </p>
                    <p className="text-xs text-gray-500">farmer@example.com</p>
                  </div>
                  <a
                    href="#settings"
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Settings
                  </a>
                  <a
                    href="#logout"
                    className="flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </a>
                </div>
              )}
            </div>

            {/* Mobile Toggle */}
            <div className="xl:hidden">
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="bg-white/15 p-2 rounded-lg border border-white/20"
              >
                {showMobileMenu ? (
                  <X className="h-5 w-5 text-white" />
                ) : (
                  <Menu className="h-5 w-5 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="xl:hidden bg-white/10 backdrop-blur-sm rounded-xl mt-3 mb-4 border border-white/20 p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-200" />
            <input
              type="text"
              placeholder="Search dashboard, reports, tools..."
              className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-green-100 text-sm"
            />
          </div>
          <div className="space-y-3">
            {dashboardSections.map((section, index) => (
              <a
                key={index}
                href={section.href}
                className={`flex items-center space-x-2 px-4 py-3 rounded-md font-medium ${
                  section.active ? "bg-white/15 text-amber-200" : "text-white"
                } hover:bg-white/10`}
              >
                <section.icon className="h-4 w-4" />
                <span>{section.name}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default FarmerDashboardNavbar;
