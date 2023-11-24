import React from "react";

export const Stepper: React.FC = () => {
  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="rounded-full bg-gray-100">
        <div className="h-2 w-1/2 rounded-full bg-black"></div>
      </div>
      <div className="flex w-full justify-between">
        <button className="rounded-md px-4 py-2 font-semibold hover:bg-slate-100">
          Table
        </button>
        <button
          className="rounded-md px-4 py-2 font-semibold hover:bg-slate-100 disabled:pointer-events-none"
          disabled
        >
          Order
        </button>
        <button
          className="rounded-md px-4 py-2 font-semibold hover:bg-slate-100 disabled:pointer-events-none"
          disabled
        >
          Review
        </button>
        <button
          className="rounded-md px-4 py-2 font-semibold hover:bg-slate-100 disabled:pointer-events-none"
          disabled
        >
          Checkout
        </button>
      </div>
    </div>
  );
};
