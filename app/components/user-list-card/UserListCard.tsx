import { User } from "@/types/types";
import { User2Icon } from "lucide-react";
import React from "react";

interface UserProps {
  setCurrentMessageUser: (user: User) => void;
  user: User;
}

const UserListCard: React.FC<UserProps> = ({ setCurrentMessageUser, user }) => {
  const { name, country, age, gender, status } = user;

  const handleCardClick = () => {
    setCurrentMessageUser(user);
  };

  const getBackgroundColor = () => {
    if (gender === "female") {
      return "bg-[linear-gradient(to_bottom,rgba(236,72,153,0.7),rgba(219,39,119,0.7))] hover:bg-white/10";
    } else if (gender === "male") {
      return "bg-[linear-gradient(to_bottom,rgba(59,130,246,0.7),rgba(37,99,235,0.7))] hover:bg-white/10";
    } else {
      return "bg-white/5 hover:bg-white/10";
    }
  };

  const statusColor = status === "Active" ? "bg-green-500" : "bg-gray-500";
  const statusText = status === "Active" ? "Active" : "Away";

  return (
    <div className="w-full px-3 py-2 cursor-pointer" onClick={handleCardClick}>
      <div
        className={`
                    flex items-center gap-3 rounded-lg border border-white/10 
                    px-3 py-2.5 backdrop-blur-md transition-all duration-200
                    max-sm:gap-2 max-sm:px-2 max-sm:py-2
                    ${getBackgroundColor()}
                `}
      >
        {/* Avatar and Status Indicator */}
        <div className="relative flex-shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-700/50 max-sm:h-8 max-sm:w-8">
            <span className="text-xl font-semibold text-white/90">
              {name?.[0].toUpperCase()}
            </span>

            <span
              className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#1a1f2e] ${statusColor}`}
              title={statusText}
            />
          </div>
        </div>

        {/* User Info */}
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="text-sm font-medium text-white/90 max-sm:text-xs truncate">
            {name}
          </span>

          <span className="text-xs text-white/50 truncate">
            {country} • {age} • {gender}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserListCard;
