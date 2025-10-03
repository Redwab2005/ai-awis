import { Diamond, FileSearch, Star } from "lucide-react";
import { dummyCreationData } from "../assets/assets";
import RecentCreation from "../components/RecentCreation";
import { useUser } from "../hook/useUser";
import { useQuery } from "@tanstack/react-query";
import { recentCreations } from "../api/ai";

export default function Dashboard() {
  const { user, isLoading } = useUser();
  const { data: creations, isLoading: isLoadingCreations } = useQuery({
    queryKey: ["creations"],
    queryFn: recentCreations,
  });
  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <div className={"flex flex-col w-full h-full justify-between  "}>
        <div className="flex justify-between">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 h-[99px] w-[310px] rounded-lg shadow-md flex items-center justify-between">
              <div>
                <p className="text-gray-500">Total Creations</p>
                <p className="text-xl font-bold">{creations?.count}</p>
              </div>
              <div
                className="p-3 rounded-lg h-[40px] w-[40px]"
                style={{
                  background:
                    "linear-gradient(145.56deg, #3588F2 4.93%, #0BB0D7 97.43%)",
                }}
              >
                <img src="/star-icon.png" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg h-[99px] w-[310px] shadow-md flex items-center justify-between">
              <div>
                <p className="text-gray-500">Active Plan</p>
                <p className="text-xl font-bold">
                  {user?.isPremium ? "Premium" : "Free"}
                </p>
              </div>
              <div
                className="p-3 rounded-lg h-[40px] w-[40px]"
                style={{
                  background:
                    "linear-gradient(145.56deg, #FF61C5 4.93%, #9E53EE 97.43%)",
                }}
              >
                <img src="/click-icon.png" />
              </div>
            </div>
          </div>{" "}
        </div>
      </div>
      <div className="mt-8  flex flex-col gap-2">
        <h2 className="text-2xl font-mono mb-4">Recent Creations</h2>
        {creations?.creations?.length > 0 ? (
          creations.creations.map(({ prompt, type, createdAt }) => (
            <RecentCreation
              key={createdAt}
              prompt={prompt}
              type={type}
              date={createdAt}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl bg-gray-50">
            <FileSearch className="h-10 w-10 text-gray-400 mb-3" />
            <p className="text-gray-600 font-medium">
              No recent creations found
            </p>
            <p className="text-sm text-gray-400">
              Start by generating your first AI creation
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
