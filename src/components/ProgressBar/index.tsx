import React from "react";

interface Props {
  progress: number;
}

export const ProgressBar: React.FC<Props> = ({ progress }) => {
  const percentage = Math.min(100, Math.max(0, progress));

  return (
    <div className="rounded-full bg-slate-200">
      <div
        className="progress-bar h-2 w-1/2 rounded-full bg-black"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};
