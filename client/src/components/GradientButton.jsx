import React from "react";

function GradientButton({
  children,
  icon: Icon,
  from = "#226BFF",
  to = "#559DFF",
  className = "",
  ...props
}) {
  // 1. أنشئ كائن style لتخزين الأنماط الديناميكية
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${from}, ${to})`,
  };

  return (
    <button
      {...props}
      style={gradientStyle} // 2. قم بتطبيق الـ style هنا
      /* 3. أزل كلاسات الـ gradient من هنا */
      className={`w-full h-[42px] rounded-lg flex items-center justify-center gap-2 
        text-white font-semibold text-[16px]
        hover:opacity-90 transition ${className}`}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </button>
  );
}

export default GradientButton;
