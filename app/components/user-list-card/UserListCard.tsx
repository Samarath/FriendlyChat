import { userProps } from "@/types/types";
import { User2Icon } from "lucide-react";

const UserListCard = ({
  name,
  country,
  age,
  gender,
  setCurrentMessageUser,
  user,
}: userProps) => {
  const setCurrentUser = () => {
    setCurrentMessageUser(user);
  };
  return (
    <div
      className="w-full px-3 py-2  hover:cursor-pointer"
      onClick={setCurrentUser}
    >
      <div
        className={`
          flex items-center gap-3 rounded-lg border border-white/10 
          px-3 py-2.5 backdrop-blur-md transition-colors
          ${
            gender === "female"
              ? "bg-[linear-gradient(to_bottom,rgba(236,72,153,0.7),rgba(219,39,119,0.7))]"
              : "bg-white/5 hover:bg-white/10"
          }
        `}
      >
        {/* Gaming controller icon */}
        <div className="relative flex-shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-700/50">
            <User2Icon className="h-5 w-5 text-white/70" />
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="text-sm font-medium text-white/90">{name}</span>

          <span className="text-xs text-white/50">
            {country} • {age}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserListCard;
