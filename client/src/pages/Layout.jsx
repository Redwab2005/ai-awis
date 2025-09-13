import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Sidebar from "../components/Sidebar";
export default function Layout() {
  const [sidebar, setSidebar] = useState(false);

  return (
    <div className="overflow-hidden h-screen w-screen">
      <Header setSidebar={setSidebar} sidebar={sidebar} />
      <div
        className="flex-1 w-full flex"
        style={{ height: "calc(100vh - 62px)" }}
      >
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        <div className="flex-1 bg-[#F9FAFB] overflow-hidden h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
