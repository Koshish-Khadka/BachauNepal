import { Button } from "@/components/ui/button";
import { Bell, Menu, Search, User } from "lucide-react";
import React from "react";

const Dashbar = () => {
  return (
    <nav className="w-full h-16 bg-white border-b flex items-center px-4 justify-between shadow-sm">
      {/* Left - Menu / Branding */}
      <div className="flex items-center gap-3">
        <Menu className="w-5 h-5 text-gray-700 cursor-pointer md:hidden" />
        <h1 className="text-lg font-semibold">Dashboard</h1>
      </div>

      {/* Middle - Search Bar */}
      <div className="hidden md:flex items-center w-96 relative">
        <Search className="w-4 h-4 text-gray-500 absolute left-3" />
        <input
          placeholder="Search resources, disasters, volunteers..."
          className="pl-9"
        />
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 bg-red-500 text-white w-3 h-3 rounded-full text-[10px] flex items-center justify-center">
            3
          </span>
        </Button>

        <Button variant="ghost" size="icon">
          <User className="w-5 h-5" />
        </Button>
      </div>
    </nav>
  );
};

export default Dashbar;
