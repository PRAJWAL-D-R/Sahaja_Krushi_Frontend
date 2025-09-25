import React from "react";
import { Briefcase, User, Calendar, Users } from "lucide-react";

interface ProfileCardProps {
  name: string;
  email?: string;
  avatarUrl?: string;
  designation?: string;
  department?: string;
  idNumber?: string;
  joinedDate?: string;
  reportingManager?: string;
  status?: string;
}

const DashboardProfileCard: React.FC<ProfileCardProps> = ({
  name,
  avatarUrl,
  designation,
  department,
  idNumber,
  joinedDate,
  reportingManager,
  status,
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg relative hover:shadow-xl transition-shadow duration-300">
      {/* Top Section: Avatar and Info */}
      <div className="flex items-center gap-4">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={name}
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-100 shadow-md"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-md">
            {name.charAt(0)}
          </div>
        )}

        <div className="flex-1">
          <div className="flex items-center">
            <p className="text-xl font-bold text-gray-800">{name}</p>
            <p
              className={`px-3 py-1 rounded-full text-xs font-semibold border-none focus:ring-2 ml-4 shadow ${
                status?.toLowerCase() === "active"
                  ? "bg-green-100 text-green-700 ring-green-200"
                  : status?.toLowerCase() === "inactive"
                  ? "bg-red-100 text-red-700 ring-red-200"
                  : "hidden"
              }`}
            >
              {status?.toLowerCase() === "active"
                ? "Active"
                : status?.toLowerCase() === "inactive"
                ? "Inactive"
                : ""}
            </p>
          </div>
          <div className="text-xs text-gray-500 mt-1 flex items-center">
            <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-medium">
              EMP-CODE : {idNumber}
            </span>
          </div>
        </div>
      </div>

      {/* Divider Section */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-4"></div>

      <div className="grid grid-cols-2 md:grid-cols-4 text-xs text-gray-700 gap-2">
        <div className="bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200">
          <div className="font-medium flex items-center gap-1 text-gray-600 mb-0.5">
            <Briefcase size={16} className="text-blue-600" />
            <span>Department</span>
          </div>
          <div className="font-semibold text-gray-800">{department}</div>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200">
          <div className="font-medium flex items-center gap-1 text-gray-600 mb-0.5">
            <User size={16} className="text-purple-600" />
            <span>Designation</span>
          </div>
          <div className="font-semibold text-gray-800">{designation}</div>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200">
          <div className="font-medium flex items-center gap-1 text-gray-600 mb-0.5">
            <Calendar size={16} className="text-green-600" />
            <span>Joined Date</span>
          </div>
          <div className="font-semibold text-gray-800">{joinedDate}</div>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200">
          <div className="font-medium flex items-center gap-1 text-gray-600 mb-0.5">
            <Users size={16} className="text-orange-600" />
            <span>Reporting Manager</span>
          </div>
          <div className="font-semibold text-gray-800">{reportingManager}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfileCard;
