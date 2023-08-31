import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { informationAction } from "../redux/reducers/information";
import { transactionAction } from "../redux/reducers/transaction";
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

  // Handle purchase
  const handlePurchase = (
    service_code: any,
    service_name: any,
    service_icon: any,
    service_tariff: any
  ) => {
    const body = {
      service_code,
      service_name,
      service_icon,
      service_tariff,
    };

    dispatch(transactionAction.purchase(body));
  };

  return (
    <>
      {service.isLoading ? (
        <Skaleton.Feature />
      ) : (
        <ul className="flex gap-x-4 w-full py-4">
          {service?.data?.data?.map((el: any, idx: any) => (
            <li
              key={idx}
              className="flex flex-col gap-y-1 mx-auto transition duration-500 hover:scale-105"
            >
              <button
                className="mx-auto flex"
                onClick={() =>
                  handlePurchase(
                    el.service_code,
                    el.service_name,
                    el.service_icon,
                    el.service_tariff
                  )
                }
              >
                <img
                  src={el.service_icon}
                  alt={el.service_code}
                  className="rounded-md w-12"
                />
              </button>
              <label htmlFor="" className="text-xs mx-auto text-center">
                {el.service_name}
              </label>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
