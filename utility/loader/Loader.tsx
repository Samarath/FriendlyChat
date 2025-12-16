import React from "react";

interface LoaderProps {
  LoadingText: string;
}

const Loader: React.FC<LoaderProps> = ({ LoadingText }) => {
  return (
    <div className="min-h-screen flex items-center justify-center align-center p-8">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-teal-400 border-r-teal-400 animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-emerald-400 border-l-emerald-400 animate-spin-reverse"></div>
        </div>
        <p className="text-slate-400 text-sm font-medium">{LoadingText}</p>
      </div>

      <style>{`
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-reverse {
          animation: spin-reverse 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Loader;
