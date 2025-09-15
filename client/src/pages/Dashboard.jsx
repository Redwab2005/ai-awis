import { Diamond, Star } from "lucide-react";
import { dummyCreationData } from "../assets/assets";
import RecentCreation from "../components/RecentCreation";

export default function Dashboard() {
  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <div className={"flex flex-col w-full h-full justify-between  "}>
        <div className="flex justify-between">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 h-[99px] w-[310px] rounded-lg shadow-md flex items-center justify-between">
              <div>
                <p className="text-gray-500">Total Creations</p>
                <p className="text-xl font-bold">1</p>
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
                <p className="text-xl font-bold">Free</p>
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
        {dummyCreationData.map(({ prompt, type, created_at }) => (
          <RecentCreation
            key={created_at}
            prompt={prompt}
            type={type}
            date={created_at}
          />
        ))}
      </div>
    </div>
  );
}
