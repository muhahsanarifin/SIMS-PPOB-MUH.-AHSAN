import React from "react";

export const Spinner: React.FC = () => {
  return (
    <>
      <div
        className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </>
  );
};

export const Feature: React.FC = () => {
  return (
    <>
      <ul className="flex w-full py-4">
        <div className="flex w-full gap-x-4 py-4 overflow-x-auto ros">
          {new Array(12).fill(0).map((_, idx) => (
            <li
              className="flex flex-col gap-y-1 min-w-[87.7386px] justify-center"
              key={idx}
            >
              <div className="animate-pulse mx-auto flex w-[48px] h-[48px] rounded-md bg-[#e5e5e5]"></div>
              <div className="animate-pulse w-full h-[16px] mx-auto bg-[#e5e5e5]"></div>
            </li>
          ))}
        </div>
      </ul>
    </>
  );
};

export const Banner: React.FC = () => {
  return (
    <>
      <ul className="flex mt-2">
        <div className="flex gap-x-6 py-2 justify-between w-full lg:overflow-x-auto ros">
          {new Array(5).fill(0).map((_, idx) => (
            <li key={idx}>
              <div className="animate-pulse w-[205.239px] h-[91.9773px] rounded-md md:rounded-none bg-[#e5e5e5]"></div>
            </li>
          ))}
        </div>
      </ul>
    </>
  );
};

export const Transaction: React.FC = () => {
  return (
    <>
      <ul>
        {new Array(3).fill(0).map((_, idx) => (
          <li key={idx} className="flex my-3">
            <div className="rounded-lg animate-pulse h-[79.2px] w-full bg-[#e5e5e5]"></div>
          </li>
        ))}
      </ul>
    </>
  );
};

export const Skaleton = {
  Feature,
  Banner,
  Transaction,
};
