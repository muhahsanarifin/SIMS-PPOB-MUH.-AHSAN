import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { Icon } from "@iconify/react";
import * as Button from "../components/Button";
import { RinoProps } from "../utils/types/input";
import { transactionAction } from "../redux/reducers/transaction";
import { ToMo, PeMo } from "./Modal";

// Reguler Input Nominal = Rino
export const Rino: React.FC<RinoProps> = ({
  onLabel,
  onName,
  onPlaceholder,
  setChange,
  onActive,
  onValue,
  onRead,
}) => {
  return (
    <>
      <div>
        <label htmlFor="email" className="sr-only">
          {onLabel}
        </label>

        <div className="relative">
          <span className="absolute inset-y-0 grid place-content-center px-4">
            <Icon
              icon="material-symbols:money"
              color={onActive ? "#000000" : "#9ca3af"}
            />
          </span>
          <input
            name={onName}
            type="number"
            className="w-full rounded-lg border-solid border-2 py-4 ps-12 pe-12 text-sm shadow-sm focus:outline-none focus:border-gray-500"
            placeholder={onPlaceholder}
            value={onValue}
            onChange={setChange}
            readOnly={onRead}
          />
        </div>
      </div>
    </>
  );
};

export const Payment: React.FC = () => {
  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();
  const purchase = useSelector(
    (state: RootState) => state.transaction.purchase
  );
  const confirmPayment = useSelector(
    (state: RootState) => state.transaction.confirmPayment
  );
  const balance = useSelector(
    (state: RootState) => state.transaction.getBalance
  );

  const handleConfirmPayment = () => {
    dispatch(transactionAction.confirmPayment(purchase?.data));
  };

  // Note: Handle payment script to be continued inside Payment Modal (Modal.tsx)

  return (
    <>
      <div className="mb-4">
        <h1 className="text-sm mb-1">Pembayaran</h1>
        <div className="flex items-center gap-x-2">
          <img
            src={purchase?.data?.service_icon}
            alt=""
            className="w-8 h-8 rounded-lg"
          />
          <p className="font-bold">{purchase?.data?.service_name}</p>
        </div>
      </div>
      <div className="flex flex-col gap-y-4">
        <Rino onValue={purchase?.data?.service_tariff} onRead={true} />
        <Button.PayTup
          onTitle="Bayar"
          onDisable={
            !purchase?.isFulfilled || balance.data?.data?.balance === 0
          }
          setClick={handleConfirmPayment}
        />
      </div>
      {/* Payment Modal */}
      {confirmPayment?.isFulfilled && <PeMo />}
    </>
  );
};

export const TopUp: React.FC = () => {
  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();
  const [top_up_amount, setTopUpAmount] = useState<any>("");
  const confirmTopUp = useSelector(
    (state: RootState) => state.transaction.confirmTopUp
  );
  const login = useSelector((state: RootState) => state.membership.login);
  const topup = useSelector((state: RootState) => state.transaction.topup);

  console.log(topup);

  const value = [
    { title: "Rp.10.000", nominal: 10000 },
    { title: "Rp.20.000", nominal: 20000 },
    { title: "Rp.50.000", nominal: 50000 },
    { title: "Rp.100.000", nominal: 100000 },
    { title: "Rp.250.000", nominal: 250000 },
    { title: "Rp.500.000", nominal: 500000 },
  ];

  // Handle Top Up
  const handleConfirmTopUp = () => {
    const amount = { top_up_amount };
    dispatch(transactionAction.confirmTopUp(amount));
  };

  const handleSetAggreeTopUp = () => {
    const accessToken = login.data?.data.token;
    const body = confirmTopUp?.data;

    const cbFulfilled = () => {
      dispatch(transactionAction.getBalanceThunk({ accessToken }));
    };

    dispatch(transactionAction.topupThunk({ accessToken, body, cbFulfilled }));
  };

  const handleCancelTopUP = () => {
    dispatch(transactionAction.closeTopUp());
    setTopUpAmount("");
    dispatch(transactionAction.clearTopUp());
  };

  return (
    <>
      <div className="mb-4">
        <p className="text-sm mb-1">Silakan masukan</p>
        <h1 className="text-xl font-bold">Nominal Top Up</h1>
      </div>
      <div className="flex gap-x-8">
        <div className="flex flex-col gap-y-4 flex-1">
          <Rino
            setChange={(e: any) => setTopUpAmount(Number(e.target.value))}
            onValue={top_up_amount}
          />
          <Button.PayTup
            onTitle="Top Up"
            onDisable={!top_up_amount}
            setClick={handleConfirmTopUp}
          />
        </div>
        <div className="flex justify-center">
          <ul className="inline-grid grid-cols-3 gap-4">
            {value.map((el, idx) => (
              <li
                key={idx}
                className="border-2 border-solid p-4 text-xs rounded-md cursor-pointer transition duration-500 hover:scale-105"
              >
                <button onClick={() => setTopUpAmount(el.nominal)}>
                  {el.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Top up Modal */}
      {/* The working approach uses props from the component to transmit the data retrieved from the state. */}
      {confirmTopUp?.isFulfilled && (
        <ToMo
          setCancel={handleCancelTopUP}
          setAggree={handleSetAggreeTopUp}
          onSuccess={topup.data?.status === 0}
          onSuccessMsg={topup.data?.message}
          onComfirmAmount={confirmTopUp.data?.top_up_amount}
        />
      )}
    </>
  );
};
