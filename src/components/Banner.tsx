import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { informationAction } from "../redux/reducers/information";
import AuthBanner from "../assets/images/Illustrasi Login.png";
import { Skaleton } from "./Loader";

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
  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();
  const login = useSelector((state: RootState) => state.membership.login);
  const banner = useSelector((state: RootState) => state.information.getBanner);

  // Get banner
  useEffect(() => {
    const accessToken = login.data?.data.token;
    dispatch(informationAction.getBannerThunk({ accessToken }));
  }, [dispatch, login.data?.data.token]);

  return (
    <>
      <div>
        <p className="text-sm font-semibold">Temukan promo menarik</p>
        {banner.isLoading ? (
          <Skaleton.Banner />
        ) : (
          <ul className="flex gap-x-6 mt-2">
            {banner?.data?.data?.map((el: any, idx: any) => (
              <li key={idx} className="transition duration-500 hover:scale-105">
                <img src={el.banner_image} alt={el.banner_name} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};
