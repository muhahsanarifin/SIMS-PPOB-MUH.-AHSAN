import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/icons/Logo.png";

const Header: React.FC<{ onDisable?: any }> = ({ onDisable }) => {
  const navigate = useNavigate();

  const router = [
    {
      title: "Top Up",
      path: "top-up",
    },
    {
      title: "Transaction",
      path: "transaction",
    },
    {
      title: "Akun",
      path: "account",
    },
  ];

  return (
    <>
      <header className="flex py-3 px-32 border-b-2 lg:px-14 md:px-4 md:bg-[#f5f5f5]/50">
        <button
          className={`flex items-center gap-x-2 lg:px-0 ${
            onDisable === "home" && "cursor-not-allowed"
          }`}
          onClick={() => navigate("/home")}
          disabled={onDisable === "home"}
        >
          <img src={Logo} alt="logo" className="w-[32px] h-[32px]"/>
          <h3 className="font-semibold md:hidden">SIMS PPOPB</h3>
        </button>
        <div className="ml-auto flex lg:px-0">
          <ul className="my-auto flex lg:px-0 md:gap-x-4">
            {router.map((el, idx) => (
              <li
                key={idx}
                className="mx-4 text-sm font-semibold lg:px-0 md:mx-0"
              >
                <button
                  onClick={() => navigate("/" + el.path)}
                  disabled={onDisable === el.path}
                  className={
                    onDisable === el.path
                      ? "cursor-not-allowed text-[#f13b2f]"
                      : "cursor-pointer"
                  }
                >
                  {el.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
