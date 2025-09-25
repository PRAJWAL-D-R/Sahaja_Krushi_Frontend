import React from "react";
import { Star } from "lucide-react";

interface NotificationItem {
  title: string;
  time: string;
}

interface NotificationCardProps {
  heading?: string;
  viewAllText?: string;
  items: NotificationItem[];
  showAddButton?: boolean;
  showViewAllButton?: boolean;
  onAddClick?: () => void;
  onViewAllClick?: () => void; // ← New prop
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  heading,
  viewAllText = "View all",
  items,
  showAddButton = false,
  showViewAllButton = false,
  onAddClick,
  onViewAllClick,
}) => {
  return (
    <div className="bg-white rounded-md shadow p-3 sm:p-4 flex flex-col gap-3 sm:gap-4 w-full">
      <div className="flex justify-between items-center">
        {heading && <h3 className="text-base sm:text-lg font-semibold">{heading}</h3>}

        {showViewAllButton && (
          <button
            className="text-xs sm:text-sm text-gray-500 hover:text-gray-800 cursor-pointer hover:underline"
            onClick={onViewAllClick}
          >
            {viewAllText}
          </button>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:gap-4">
        {items.map((item, index) => (
          <div key={index} className="flex gap-2 items-start">
            <div className="mt-0.5 sm:mt-1">
              <Star className="text-orange-500 w-3.5 h-3.5 sm:w-4 sm:h-4" fill="orange" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-800">{item.title}</p>
              <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5 sm:mt-1">{item.time}</p>
            </div>
          </div>
        ))}
      </div>

      {showAddButton && (
        <button
          className="mt-3 sm:mt-4 bg-orange-500 text-white px-6 sm:px-8 py-1.5 sm:py-2 rounded hover:bg-orange-600 self-end text-xs sm:text-sm cursor-pointer"
          onClick={onAddClick}
        >
          Add
        </button>
      )}
    </div>
  );
};

export default NotificationCard;
