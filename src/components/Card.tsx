import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { Icon } from "@iconify/react";
import * as icon from "../utils/icon";
import { transactionAction } from "../redux/reducers/transaction";
import { numberFormat } from "../helpers/intl";

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
      <div className="w-1/2 bg-[#f13b2f] rounded-lg p-5 text-[#fafafa] flex flex-col justify-center">
        <p className="text-sm">Saldo anda</p>
        <div className="flex gap-x-2 my-2">
          <h1 className="text-2xl font-bold">Rp </h1>
          <input
            type={visibleSaldo ? "text" : "password"}
            disabled
            className="bg-transparent lg:w-full text-2xl"
            // Value tobe string empty when balance state has'nt been fullfilled.
            value={
              balance?.isFulfilled
                ? numberFormat(balance.data?.data?.balance)
                : ""
            }
          />
        </div>

        <label className="text-xs flex items-center">
          <span className="min-w-[5rem]">
            {visibleSaldo ? "Tutup saldo" : "Lihat saldo"}
          </span>
          <button
            onClick={() => setVisibleSaldo(!visibleSaldo)}
            className="flex items-center py-1"
          >
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
              width={icon.saldo.widh}
              height={icon.saldo.height}
            />
          </button>
        </label>
      </div>
    </>
  );
};
