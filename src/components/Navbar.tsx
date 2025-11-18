import { LogoutUser } from "@/actions/auth";
import { useUser } from "@/context/userContext";
import { MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const { user } = useUser();

  const logoutHandler = async () => {
    await LogoutUser();
    router.push("/auth/login");
  };
  return (
    <nav
      className="
  absolute 
  top-4 
  left-1/2 
  -translate-x-1/2
  flex justify-center items-center 
  z-[9999] 
  bg-white/90 
  px-6 py-3 
  rounded-2xl 
  shadow-lg
"
    >
      <ul className="flex items-center gap-x-10 ">
        <li className="flex items-center gap-2 text-[16px] font-bold text-gray-700">
          <MapPin />
          Bachau Nepal koshish don
        </li>
        <li className="text-base text-gray-600">Map</li>
        <li className="text-base text-gray-600">Blogs</li>
        <li className="text-[18px] ">
          {user ? (
            <button
              title="button"
              className="bg-blue-800 p-2 px-4 rounded-lg text-white font-medium text-[16px] transition-all ease-in-out hover:scale-105 duration-150"
              onClick={logoutHandler}
            >
              Logout
            </button>
          ) : (
            <button
              title="button"
              className="bg-blue-800 p-2 px-4 rounded-lg text-white font-medium text-[16px] transition-all hover:scale-105 duration-150"
              onClick={() => router.push("/auth/login")}
            >
              Volunter Login
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
