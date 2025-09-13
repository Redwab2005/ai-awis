import {
  House,
  SquarePen,
  Images,
  FileText,
  Users,
  Scissors,
  Eraser,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";

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

function Sidebar({ Sidebar, setSidebar }) {
  //NOTE: if the user in not logged in, we must redirect them to the login page
  return (
    <div
      className={`w-60 flex  flex-col ${
        Sidebar ? "translate-x-0" : "max-sm:-translate-x-full"
      } transition-transform duration-300 ease-in-out h-screen `}
    >
      {/* Top user information */}
      <div className="my-5">
        <img
          src="/profile_img_1.png"
          alt="profile"
          className="w-16 h-16 rounded-full mx-auto"
        />
        <h2 className="text-center mt-1 text-lg font-semibold">John Doe</h2>
      </div>
      {/* Nav bar items */}
      <div className="flex flex-col my-2  items-center gap-1">
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
      <div className="flex mt-11 items-center justify-between px-4 pt-1 border-[#e5e5e5] bg-[#e5e5e5]">
        <img
          src="/profile_img_1.png"
          alt="profile"
          className="w-8 h-8 rounded-full"
        />
        <div className="flex flex-col ml-2 flex-1">
          <span className="text-sm font-semibold">John Doe</span>
          <span className="text-xs text-gray-500">Free Plan</span>
        </div>
        <button
          className="ml-2 text-gray-600 hover:text-red-500"
          title="Logout"
          onClick={() => {
            // handle logout here
          }}
        >
          <LogOut />
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
