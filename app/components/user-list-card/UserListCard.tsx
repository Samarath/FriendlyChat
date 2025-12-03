import { User } from "@/types/types";
import { User2Icon } from "lucide-react";

interface UserProps {
  name: string;
  country: string;
  age: number;
  gender: string;
  setCurrentMessageUser: (user: User) => void;
  user: User;
}

const UserListCard = ({
  name,
  country,
  age,
  gender,
  setCurrentMessageUser,
  user,
}: UserProps) => {
  const setCurrentUser = () => {
    setCurrentMessageUser(user);
  };

  const getBackgroundColor = () => {
    if (gender === "female") {
      return "bg-[linear-gradient(to_bottom,rgba(236,72,153,0.7),rgba(219,39,119,0.7))]";
    } else if (gender === "male") {
      return "bg-[linear-gradient(to_bottom,rgba(59,130,246,0.7),rgba(37,99,235,0.7))]";
    } else {
      return "bg-white/5 hover:bg-white/10";
    }
  };

  return (
    <div
      className="w-full px-3 py-2 hover:cursor-pointer"
      onClick={setCurrentUser}
    >
      <div
        className={`
          flex items-center gap-3 rounded-lg border border-white/10 
          px-3 py-2.5 backdrop-blur-md transition-colors
          max-sm:gap-2 max-sm:px-2 max-sm:py-2
          ${getBackgroundColor()}
        `}
      >
        {/* Avatar icon */}
        <div className="relative flex-shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-700/50 max-sm:h-8 max-sm:w-8">
            <User2Icon className="h-5 w-5 text-white/70 max-sm:h-4 max-sm:w-4" />
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1 max-sm:flex-row max-sm:items-center max-sm:gap-2">
          <span className="text-sm font-medium text-white/90 max-sm:text-xs">
            {name}
          </span>

          <span className="text-xs text-white/50 max-sm:hidden">
            {country} • {age}
          </span>

          <span className="hidden text-xs text-white/50 max-sm:inline">
            {age}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserListCard;
