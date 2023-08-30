import React from "react";

import { Icon } from "@iconify/react";
import * as icon from "../utils/icon";

export const Saldo: React.FC = () => {
  const visible = true;

  return (
    <>
      <div className="w-1/2 bg-[#f13b2f] rounded-lg p-5 text-[#fafafa]">
        <p className="text-sm">Saldo anda</p>
        <h1 className="text-2xl font-bold my-2">
          Rp{" "}
          <input
            type="text"
            disabled
            className="bg-transparent"
            value={200000}
          />
        </h1>

        <label htmlFor="" className="text-xs flex gap-x-2 items-center">
          <span>lihat saldo</span>
          <button>
            <Icon
              icon={
                visible ? icon.saldo.visibility.on : icon.saldo.visibility.off
              }
              color={
                visible ? icon.saldo.color.active : icon.saldo.color.disable
              }
            />
          </button>
        </label>
      </div>
    </>
  );
};
