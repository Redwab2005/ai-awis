import React from "react";

function GradientButton({
  children,
  icon: Icon,
  from = "#226BFF",
  to = "#559DFF",
  className = "",
  ...props
}) {
  return (
    <button
      {...props}
      className={`w-full h-[42px] rounded-lg flex items-center justify-center gap-2 
        text-white font-semibold text-[16px]
        bg-gradient-to-r from-[${from}] to-[${to}] 
        hover:opacity-90 transition ${className}`}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </button>
  );
}

export default GradientButton;
