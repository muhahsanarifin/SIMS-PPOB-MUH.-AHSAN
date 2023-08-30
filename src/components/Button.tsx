import React from "react";

import * as ButtonType from "../utils/types/button";

export const Auth: React.FC<ButtonType.AuthButtonProps> = ({
  onTitle,
  onDisable,
  setClick,
}) => {
  return (
    <>
      <button
        className={`block w-full rounded bg-[#f3271c] px-5 py-3 text-sm font-medium text-white ${
          onDisable ? "cursor-not-allowed bg-[#fca5a5]" : "bg-[#f3271c]"
        }`}
        onClick={setClick}
        disabled={onDisable}
      >
        {onTitle}
      </button>
    </>
  );
};

// This button used by for Payment and Top Up
export const PayTup: React.FC<ButtonType.AuthButtonProps> = ({
  onTitle,
  onDisable,
  setClick,
}) => {
  return (
    <>
      <button
        className={`block w-full rounded bg-[#f3271c] px-5 py-3 text-sm font-medium text-white ${
          onDisable ? "cursor-not-allowed bg-[#fca5a5]" : "bg-[#f3271c]"
        }`}
        onClick={setClick}
        disabled={onDisable}
      >
        {onTitle}
      </button>
    </>
  );
};