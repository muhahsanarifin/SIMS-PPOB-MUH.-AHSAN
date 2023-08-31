import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { Icon } from "@iconify/react";
import * as icon from "../utils/icon";
import { transactionAction } from "../redux/reducers/transaction";

export const Saldo: React.FC = () => {
  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();
  const login = useSelector((state: RootState) => state.membership.login);

  // Handle visible saldo
  const [visibleSaldo, setVisibleSaldo] = useState(false);

  // Get balance
  useEffect(() => {
    const accessToken = login.data?.data.token;
    dispatch(transactionAction.getBalanceThunk({ accessToken }));
  }, [dispatch, login.data?.data.token]);

  const balance = useSelector(
    (state: RootState) => state.transaction.getBalance
  );

  return (
    <>
      <div className="w-1/2 bg-[#f13b2f] rounded-lg p-5 text-[#fafafa]">
        <p className="text-sm">Saldo anda</p>
        <h1 className="text-2xl font-bold my-2">
          Rp{" "}
          <input
            type={visibleSaldo ? "text" : "password"}
            disabled
            className="bg-transparent"
            value={balance.data?.data?.balance}
          />
        </h1>

        <label htmlFor="" className="text-xs flex gap-x-2 items-center">
          <span>lihat saldo</span>
          <button onClick={() => setVisibleSaldo(!visibleSaldo)}>
            <Icon
              icon={
                visibleSaldo
                  ? icon.saldo.visibility.on
                  : icon.saldo.visibility.off
              }
              color={
                visibleSaldo
                  ? icon.saldo.color.active
                  : icon.saldo.color.disable
              }
            />
          </button>
        </label>
      </div>
    </>
  );
};
