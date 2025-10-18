import React from "react";
import { Heart, Loader } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { community as communityApi } from "../api/ai";

export default function Community() {
  const { data: community, isLoading: isLoadingCreations } = useQuery({
    queryKey: ["community"],
    queryFn: communityApi,
  });
  return (
    <div className="flex flex-col gap-4 w-full h-full p-5 ">
      <h3 className="text-xl text-gray-800 font-mono">Creations</h3>

      <div className="bg-gray-200   p-5 h-full w-full rounded-xl overflow-y-scroll ">
        {/* Grid container */}
        {isLoadingCreations ? (
          <Loader className="w-8 h-8 text-center animate-spin text-green-600 " />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 ">
            {community.creations.map(({ result, prompt }, index) => (
              <div
                key={index}
                className="relative rounded-xl overflow-hidden shadow-md group"
              >
                {/* Image */}
                <img
                  src={result}
                  alt={prompt}
                  className="w-full h-72 object-cover group-hover:scale-105 transition duration-500"
                />

                {/* Hover overlay with prompt */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent text-white p-3 opacity-0 group-hover:opacity-100 transition">
                  <p className="text-sm">{prompt}</p>
                </div>

                {/* Likes counter */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1 text-white text-sm">
                  <Heart className="w-4 h-4" />3
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
