import React from "react";
import { cn } from "../lib/utils";

type TabItem = {
  label: string;
  value: string;
};

type TabsProps = {
  tabs: TabItem[];
  selectedTab: string;
  onChange: (value: string) => void;
};

const Tabs: React.FC<TabsProps> = ({ tabs, selectedTab, onChange }) => {
  return (
    <div className="w-full mt-5">
      <div className="flex space-x-8 border-b-2 border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={cn(
              "text-sm pb-2 font-medium transition-all -mb-[2px] cursor-pointer",
              selectedTab === tab.value
                ? "text-black border-b-2 border-orange-500"
                : "text-gray-500 hover:text-black border-b-2 border-transparent"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
