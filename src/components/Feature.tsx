import React from "react";

import Kurban from "../assets/icons/Kurban.png";

export const Home: React.FC = () => {
  return (
    <>
      <ul className="flex gap-x-4 w-full py-4">
        {new Array(12).fill(1).map((_, idx) => (
          <li key={idx} className="flex flex-col gap-y-1 mx-auto">
            <button className="mx-auto flex">
              <img src={Kurban} alt="" className="rounded-md w-12"/>
            </button>
            <label htmlFor="" className="text-xs mx-auto">Sample</label>
          </li>
        ))}
      </ul>
    </>
  );
};
