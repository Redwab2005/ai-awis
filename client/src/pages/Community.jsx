import React from "react";
import { dummyPublishedCreationData } from "../assets/assets";
import { Heart } from "lucide-react";

export default function Community() {
  return (
    <div className="flex flex-col gap-4 w-full h-full p-5 ">
      <h3 className="text-xl text-gray-800 font-mono">Creations</h3>

      <div className="bg-slate-300 p-5 h-full w-full rounded-xl overflow-y-scroll ">
        {/* Grid container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 ">
          {dummyPublishedCreationData.map((item, index) => (
            <div
              key={index}
              className="relative rounded-xl overflow-hidden shadow-md group"
            >
              {/* Image */}
              <img
                src={item.content}
                alt={item.prompt}
                className="w-full h-72 object-cover group-hover:scale-105 transition duration-500"
              />

              {/* Hover overlay with prompt */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent text-white p-3 opacity-0 group-hover:opacity-100 transition">
                <p className="text-sm">{item.prompt}</p>
              </div>

              {/* Likes counter */}
              <div className="absolute bottom-3 right-3 flex items-center gap-1 text-white text-sm">
                <Heart className="w-4 h-4" />
                {item.likes.length}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
