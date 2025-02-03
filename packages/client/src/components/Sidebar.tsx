import React from "react";
import {
  Box,
  MessageSquare,
  Database,
  Globe,
  Anchor,
  Zap,
  ChevronRight,
  Search,
  LucideIcon,
} from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-50 border-r h-full">
      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-8 pr-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
        </div>
      </div>

      <div className="p-2">
        <div className="mb-4">
          <div className="flex items-center px-2 py-1 text-sm font-medium text-gray-600">
            <ChevronRight className="w-4 h-4 mr-1" />
            <span>Camel components</span>
          </div>
          <div className="ml-4 space-y-1">
            <ComponentItem icon={Box} label="Direct" />
            <ComponentItem icon={MessageSquare} label="Log" />
            <ComponentItem icon={Globe} label="HTTP" />
            <ComponentItem icon={Database} label="SQL" />
            <ComponentItem icon={Anchor} label="Jetty" />
            <ComponentItem icon={Zap} label="Velocity" />
          </div>
        </div>
      </div>
    </div>
  );
};

const ComponentItem = ({
  icon: Icon,
  label,
}: {
  icon: LucideIcon;
  label: string;
}) => (
  <div className="flex items-center px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
    <Icon className="w-4 h-4 mr-2" />
    <span>{label}</span>
  </div>
);

export default Sidebar;
