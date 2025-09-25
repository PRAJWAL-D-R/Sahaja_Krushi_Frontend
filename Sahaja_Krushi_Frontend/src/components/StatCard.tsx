import React, { ReactElement } from "react";

interface Trend {
  value: number;
  isPositive: boolean;
}

interface StatCardProps {
  title: string;
  value: number;
  icon: ReactElement;
  trend?: Trend;
  bgColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend }) => {
  return (
    <div
      className={`
      bg-gradient-to-br from-white to-gray-50
      rounded-lg
      p-4
      shadow-sm
      border border-gray-100
      transition-all
      duration-200
      hover:shadow-md
      hover:border-blue-200
      hover:translate-y-[-1px]
      cursor-pointer
      overflow-hidden
      relative
      group
      bgColor?: string;
    `}
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 group-hover:bg-indigo-600 transition-colors duration-200"></div>
      <div className="absolute bottom-0 right-0 w-12 h-12 -mb-4 -mr-4 rounded-full bg-blue-50 opacity-20 group-hover:opacity-30 transition-opacity duration-200"></div>
      <div className="flex items-center justify-between relative z-10">
        <div>
          <p className="text-xs font-medium text-gray-600 mb-1 group-hover:text-gray-800 transition-colors duration-200">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <p className="text-xl font-semibold text-gray-900 group-hover:text-blue-900 transition-colors duration-200">
              {value}
            </p>
            {/* {trend && (
              <span className={`text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {trend.isPositive ? '+' : '-'}{trend.value}%
              </span>
            )} */}
          </div>
        </div>
        <div className="text-blue-500 group-hover:text-indigo-600 transition-all duration-200 hover:scale-110">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
