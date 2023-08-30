import React from "react";
import AuthBanner from "../assets/images/Illustrasi Login.png";
import BannerOne from "../assets/images/Banner 1.png";

export const Auth: React.FC = () => {
  return (
    <>
      <div className=" w-1/2">
        <img src={AuthBanner} alt="Ilustrasi login" className="h-full w-full" />
      </div>
    </>
  );
};

export const Home: React.FC = () => {
  return (
    <>
      <div>
        <p className="text-sm font-semibold">Temukan promo menarik</p>
        <ul className="flex gap-x-6 mt-2">
          {new Array(4).fill(1).map((_, idx) => (
            <li key={idx}>
              <img src={BannerOne} alt="" />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
