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

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  avatarUrl,
  designation,
  department,
  idNumber,
  joinedDate,
  reportingManager,
  status,
}) => {
  const statusStyles =
    status?.toLowerCase() === "active"
      ? "bg-green-100 text-green-700"
      : status?.toLowerCase() === "inactive"
      ? "bg-red-100 text-red-700"
      : "hidden";

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-6 w-full">
      {/* Top Section */}
      <div className="flex items-center flex-wrap sm:flex-nowrap gap-4">
        {/* Avatar */}
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={name}
            className="w-20 h-20 rounded-full object-cover"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xl font-semibold">
            {name.charAt(0).toUpperCase()}
          </div>
        )}

        {/* Name & Status aligned beside avatar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-3">
          <p className="text-base sm:text-lg font-semibold text-gray-800">
            {name}
          </p>
          {status && (
            <span
              className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${statusStyles}`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
            </span>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-4"></div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-700">
        {!!department && (
          <InfoBlock
            icon={<Briefcase size={16} />}
            label="Department"
            value={department}
          />
        )}

        {!!designation && (
          <InfoBlock
            icon={<User size={16} />}
            label="Designation"
            value={designation}
          />
        )}

        {!!joinedDate && (
          <InfoBlock
            icon={<Calendar size={16} />}
            label="Joined Date"
            value={joinedDate}
          />
        )}

        {!!reportingManager && (
          <InfoBlock
            icon={<Users size={16} />}
            label="Reporting Manager"
            value={reportingManager}
          />
        )}
      </div>
    </div>
  );
};

// Reusable Info Block
const InfoBlock = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
}) => (
  <div>
    <div className="font-bold flex justify-center items-center gap-2 text-gray-600 mb-1">
      {icon}
      <span>{label}</span>
    </div>
    <div className="text-gray-500 font-normal text-[12px] flex justify-center items-center">
      {value || "N/A"}
    </div>
  </div>
);

export default ProfileCard;
