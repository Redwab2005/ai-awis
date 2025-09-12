import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      textAlign: "center",
    }}
  >
    <h1>404</h1>
    <h2>Page Not Found</h2>
    <p>The page you are looking for does not exist.</p>
    <Link
      to="/"
      style={{
        marginTop: "20px",
        color: "#0070f3",
        textDecoration: "underline",
      }}
    >
      Go to Home
    </Link>
  </div>
);

export default NotFound;
