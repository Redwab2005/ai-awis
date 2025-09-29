import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.svg";
import { useEffect } from "react";
import { useState } from "react";

export default function Header({ sidebar, setSidebar }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function fetchUser() {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/user/me`,
        {
          credentials: "include",
        }
      );
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      }
    }
    fetchUser();
  }, []);
  return (
    <header className="h-[62px] bg-[#FDFDFE] border-b border-[#e5e5e5] flex items-center justify-between px-6">
      {/* Logo */}
      <Link to="/" className="flex items-center h-full">
        <img src={logo} alt="Logo" className="h-10" />
      </Link>

      <div className="flex items-center gap-4">
        {user ? (
          <span>{user.user_name}</span>
        ) : (
          <Link
            to="/signup"
            className="px-4 py-2 text-white bg-[#5044E5] rounded-lg hover:bg-[#4035c9] transition-colors"
          >
            Sign Up
          </Link>
        )}

        {sidebar ? (
          <X
            onClick={() => setSidebar(false)}
            className="w-6 h-6 text-gray-700 cursor-pointer"
          />
        ) : (
          <Menu
            onClick={() => setSidebar(true)}
            className="w-6 h-6 text-gray-700 cursor-pointer md:hidden"
          />
        )}
      </div>
    </header>
  );
}
