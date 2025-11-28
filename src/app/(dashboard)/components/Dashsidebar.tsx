"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/userContext";
import {
  AlertTriangle,
  Home,
  HomeIcon,
  Package,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Dashsidebar = () => {
  const pathname = usePathname();
  const { user } = useUser();
  // console.log("Userdata", user);

  const navcontentAdmin = [
    { id: "1", name: "Dasboard", icon: <HomeIcon />, href: "/dashboard" },
    {
      id: "2",
      name: "Disasters",
      icon: <AlertTriangle />,
      href: "/dashboard/disasters",
    },
    {
      id: "3",
      name: "Resources",
      icon: <Package />,
      href: "/dashboard/resources",
    },
    {
      id: "4",
      name: "Volunteers",
      icon: <Users />,
      href: "/dashboard/volunteers",
    },
    {
      id: "5",
      name: "Settings",
      icon: <Settings />,
      href: "/dashboard/settings",
    },
  ];

  const navcontentVolunteer = [
    { id: "1", name: "Dasboard", icon: <HomeIcon />, href: "/dashboard" },
    {
      id: "2",
      name: "Disasters",
      icon: <AlertTriangle />,
      href: "/dashboard/disasters",
    },
    {
      id: "3",
      name: "Resources",
      icon: <Package />,
      href: "/dashboard/resources",
    },
    {
      id: "5",
      name: "Settings",
      icon: <Settings />,
      href: "/dashboard/settings",
    },
  ];

  const navContent =
    user?.role === "admin" ? navcontentAdmin : navcontentVolunteer;
    
  return (
    <nav className=" flex flex-col space-y-2 p-4">
      <div className="flex gap-4 items-center border-b pb-4">
        <Button className="h-14 w-14">
          <Home className={`w-5 h-5`} />
        </Button>
        <div>
          <h3 className="font-semibold text-lg text-gray-800">Bachau Nepal</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Nepal Disaster Response
          </p>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        {navContent.map((content) => {
          const isActive = pathname === content.href;
          return (
            <Link
              key={content.id}
              href={content.href}
              className={`flex items-center gap-4 p-3 rounded-lg transition
                ${
                  isActive
                    ? "bg-gray-200 text-blue-600 font-semibold"
                    : "hover:bg-gray-100"
                }
              `}
            >
              {content.icon}
              {content.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Dashsidebar;
