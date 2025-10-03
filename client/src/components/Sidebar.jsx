import {
  House,
  SquarePen,
  Images,
  FileText,
  Users,
  Scissors,
  Eraser,
  LogOut,
  Loader,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useLogout } from "../hook/useLogout";
import { useUser } from "../hook/useUser";

const navItems = [
  { to: "/ai", label: "Dashboard", icon: House },
  { to: "/ai/write-article", label: "Write Article", icon: SquarePen },
  { to: "/ai/blog-titles", label: "Blog Titles", icon: FileText },
  { to: "/ai/generate-images", label: "Generate Images", icon: Images },
  { to: "/ai/review-resume", label: "Review Resume", icon: FileText },
  { to: "/ai/remove-background", label: "Remove Background", icon: Eraser },
  { to: "/ai/remove-object", label: "Remove Object", icon: Scissors },
  { to: "/ai/community", label: "Community", icon: Users },
];

function Sidebar({ sidebar, setSidebar }) {
  const logout = useLogout();
  const { user, isLoading } = useUser();
  console.log("User in sidebar:", user);
  //NOTE: if the user in not logged in, we must redirect them to the login page
  return (
    <div
      className={`
        w-60 flex flex-col
        fixed top-[62px] left-0 h-[calc(100vh-62px)] bg-white shadow-md z-50
        transition-transform duration-300 ease-in-out
        ${sidebar ? "translate-x-0" : "-translate-x-full"}
        sm:relative sm:top-0 sm:left-0 sm:h-full sm:shadow-none sm:bg-gray-100 sm:z-auto sm:translate-x-0
        `}
    >
      {/* in small screen the sidebar will be fixed (you can move it without let space behiend)
      and in above the small device will be relative */}

      {/* Top user information */}
      <div className="my-5">
        {isLoading ? (
          <Loader className="w-10 h-10 animate-spin text-[#5044E5]" />
        ) : (
          <>
            <img
              src="/profile_img_1.png"
              alt="profile"
              className="w-16 h-16 rounded-full mx-auto"
            />
            <h2 className="text-center mt-1 text-lg font-semibold">
              {user?.user_name}
            </h2>
          </>
        )}
      </div>
      {/* Nav bar items */}
      <div className="flex flex-col my-2 items-center gap-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/ai"}
            onClick={() => setSidebar(false)}
            className={({
              isActive,
            }) => `h-[36px] w-[189px] px-3.5 py-2.5 flex items-center gap-3 rounded text-sm
                                    ${
                                      isActive
                                        ? "bg-gradient-to-t from-blue-500 to-purple-600 text-white"
                                        : "text-gray-700 hover:bg-gray-200"
                                    }`}
          >
            <Icon className="w-5 h-4" />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
      {/* Bottom user info and logout */}
      <div className="flex mt-auto h-[60px] items-center justify-between px-4 pt-1 border-[#e5e5e5] bg-[#e5e5e5]">
        <img
          src="/profile_img_1.png"
          alt="profile"
          className="w-8 h-8 rounded-full"
        />
        <div className="flex flex-col ml-2 flex-1">
          <span className="text-sm font-semibold">{user?.user_name}</span>
          <span className="text-xs text-gray-500">
            {user?.isPremium ? "Premium" : "Free"}
          </span>
        </div>
        <button
          className="ml-2 text-gray-600 hover:text-red-500"
          title="Logout"
          onClick={() => {
            logout.mutate(undefined);
          }}
          disabled={logout.isLoading}
        >
          <LogOut />
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
