import { HeaderProps } from "@/types/types";
import { Users } from "lucide-react";

const Header = ({
  loggedInUser,
  tabs,
  activeTab,
  onTabChange,
  userCount,
}: HeaderProps) => {
  return (
    <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 lg:px-6 lg:py-4">
      <div className="flex items-center gap-3 lg:gap-6">
        <div className="hidden lg:flex items-center gap-3">
          <Users className="h-6 w-6 text-teal-400" />
          <h2 className="text-lg font-semibold text-white">Friendly chat</h2>
        </div>

        <div className="flex lg:hidden items-center">
          <Users className="h-5 w-5 text-teal-400" />
        </div>

        <div className="flex items-center gap-1.5 lg:gap-2">
          {tabs
            .filter((tab) => tab !== "DMs")
            .map((tab) => (
              <button
                key={tab}
                onClick={() => onTabChange(tab)}
                className={`rounded-full px-3 py-1 lg:px-4 lg:py-1.5 text-xs lg:text-sm font-medium transition-all ${
                  activeTab === tab
                    ? "border border-teal-400/60 bg-teal-400/10 text-teal-300"
                    : "text-white/60 hover:text-white/80"
                }`}
              >
                {tab}
              </button>
            ))}
        </div>
      </div>

      <div className="flex items-center gap-3 lg:gap-6">
        <span className="hidden lg:inline text-sm text-white/70">
          All Users ({userCount})
        </span>

        <div className="flex items-center gap-3">
          <span className="hidden lg:inline text-sm text-white/70">
            Logged in as
          </span>

          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-2 py-1 lg:px-3 lg:py-1.5">
            <div className="flex h-6 w-6 lg:h-7 lg:w-7 items-center justify-center rounded-full bg-teal-500/20 text-xs font-medium text-teal-400">
              {loggedInUser.avatar}
            </div>

            <span className="hidden lg:inline text-sm font-medium text-white">
              {loggedInUser.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
