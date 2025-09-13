import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.svg";

export default function Header({ sidebar, setSidebar }) {
  return (
    <header className="h-[62px] bg-[#FDFDFE] border-b border-[#e5e5e5] flex items-center justify-between px-6">
      {/* Logo */}
      <Link to="/" className="flex items-center h-full">
        <img src={logo} alt="Logo" className="h-10" />
      </Link>
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
    </header>
  );
}
