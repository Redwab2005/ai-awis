import React from "react";
import { Outlet } from "react-router-dom";
export default function Layout() {
  return (
    <>
      <h1>layout </h1>
      <Outlet />
      <h1>fotter</h1>
    </>
  );
}
