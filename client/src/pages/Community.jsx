import React from "react";
import { Heart, Loader } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { community as communityApi } from "../api/ai";
import useLike from "../hook/useLike";
import { useUser } from "../hook/useUser";

const normalizeId = (value) => {
  if (!value) return null;
  if (typeof value === "string") return value;
  if (typeof value === "object") {
    if ("_id" in value && value._id) return value._id.toString();
    if (typeof value.toString === "function") return value.toString();
  }
  return null;
};

export default function Community() {
  const {
    data: community,
    isLoading: isLoadingCreations,
    isError: communityError,
  } = useQuery({
    queryKey: ["community"],
    queryFn: communityApi,
  });
  const { like, isError: likeError } = useLike();
  const { user } = useUser();

  const creations = community?.creations ?? [];
  const userId = normalizeId(user?._id);

  const handleLike = (creationId) => {
    if (!creationId) return;
    like(creationId);
  };

  const renderSkeletonCards = () => {
    return Array.from({ length: 6 }).map((_, index) => (
      <div
        key={`skeleton-${index}`}
        className="relative h-72 animate-pulse overflow-hidden rounded-2xl bg-slate-700/60"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700/80 to-slate-800/40" />
      </div>
    ));
  };

  const renderCreations = () => {
    if (isLoadingCreations) {
      return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {renderSkeletonCards()}
        </div>
      );
    }

    if (!creations.length) {
      return (
        <p className="text-center text-slate-200">
          No public creations yet - be the first to publish one!
        </p>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {creations.map((creation) => {
          const { _id, likes, likedBy, prompt, result } = creation;
          const likeCount = Math.max(0, likes ?? 0);
          const likedByList = Array.isArray(likedBy) ? likedBy : [];
          const normalizedLikedBy = likedByList
            .map(normalizeId)
            .filter(Boolean);
          const isOptimistic =
            typeof creation.__optimisticLiked === "boolean"
              ? creation.__optimisticLiked
              : null;
          const isLiked =
            isOptimistic ?? (userId ? normalizedLikedBy.includes(userId) : false);

          return (
            <div key={_id} className="group relative overflow-hidden rounded-2xl bg-slate-900/30">
              <img
                src={result}
                alt={prompt}
                className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/20 to-transparent opacity-0 transition group-hover:opacity-100" />

              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-4 text-white opacity-0 transition group-hover:opacity-100">
                <p className="text-sm text-slate-100">{prompt}</p>
                <div className="text-xs uppercase tracking-wide text-slate-400">
                  {likeCount} {likeCount === 1 ? "like" : "likes"}
                </div>
              </div>

              <div className="absolute bottom-4 right-4">
                <button
                  type="button"
                  onClick={() => handleLike(_id)}
                  className={`flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-sm font-medium shadow-lg backdrop-blur transition hover:bg-black/70 ${
                    isLiked ? "text-rose-400" : "text-white"
                  }`}
                  aria-pressed={isLiked}
                  aria-label="Toggle like"
                >
                  <Heart
                    className="h-5 w-5"
                    fill={isLiked ? "currentColor" : "none"}
                  />
                  <span className="font-semibold">{likeCount}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const feedbackMessage = communityError
    ? "Failed to load community creations."
    : likeError
    ? "Unable to update like. Please try again."
    : null;

  return (
    <div className="flex-1 overflow-y-auto px-6 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="space-y-3">
          <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1 text-xs uppercase tracking-[0.2em] text-slate-500">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Community
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">Explore Public Creations</h1>
              <p className="mt-2 text-base text-slate-500">
                Discover the latest AI-generated visuals shared by the community. Show some love to the ideas
                that inspire you.
              </p>
            </div>
          </div>
        </header>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
          {feedbackMessage && (
            <p className="mb-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
              <Loader className="h-4 w-4 animate-spin text-red-500" />
              {feedbackMessage}
            </p>
          )}
          {renderCreations()}
        </div>
      </div>
    </div>
  );
}
