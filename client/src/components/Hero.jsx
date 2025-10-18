import React from "react";
import bg from "../assets/gradientBackground.png";
import { useNavigate } from "react-router-dom";
import userGroup from "../assets/user_group.png";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div
      className="px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center bg-cover bg-no-repeat min-h-screen "
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="text-center mb-6 ">
        <h1 className="text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-semibold mx-auto  leading-[1.2]">
          create amazing content <br />{" "}
          <span className="text-[--color-primary]"> with ai tools</span>{" "}
        </h1>
        <p className="mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs text-gray-600">
          transform your content creation with our suite of premium ai tools.
          write articles, generate images, and enhance your workflow.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs">
        <button
          onClick={() => navigate("/ai")}
          className="bg-[--color-primary] text-white px-10 py-3 rounded-lg hover:scale-102 active:scale-95 transition cursor-pointer"
        >
          start creating now{" "}
        </button>
        <button className="bg-white px-10 py-3 rounded-lg border border-grey-300 hover:scale-95 transition cursor-pointer">
          watch demo
        </button>
      </div>
      <div className="flex items-center gap-4 mt-8 mx-auto text-grey-600">
        <img src={userGroup} alt="" className="h-8" /> trusted by over{" "}
        <span className="text-[--color-primary] font-semibold">1000+ </span>{" "}
        users worldwide
      </div>
    </div>
  );
};

export default Hero;
