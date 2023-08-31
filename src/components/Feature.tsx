import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { informationAction } from "../redux/reducers/information";
import { Skaleton } from "./Loader";

export const Home: React.FC = () => {
  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();
  const login = useSelector((state: RootState) => state.membership.login);
  const service = useSelector(
    (state: RootState) => state.information.getService
  );

  // Get services
  useEffect(() => {
    const accessToken = login.data?.data.token;
    dispatch(informationAction.getServicesThunk({ accessToken }));
  }, [dispatch, login.data?.data.token]);

  return (
    <>
      {service.isLoading ? (
        <Skaleton.Feature />
      ) : (
        <ul className="flex gap-x-4 w-full py-4">
          {service?.data?.data?.map((el: any, idx: any) => (
            <li key={idx} className="flex flex-col gap-y-1 mx-auto">
              <button className="mx-auto flex">
                <img
                  src={el.service_icon}
                  alt={el.service_code}
                  className="rounded-md w-12"
                />
              </button>
              <label htmlFor="" className="text-xs mx-auto">
                {el.service_name}
              </label>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
