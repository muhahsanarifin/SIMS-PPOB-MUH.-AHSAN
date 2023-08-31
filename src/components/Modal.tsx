import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { Icon } from "@iconify/react";
import { rupiahWithNC } from "../helpers/intl";
import { transactionAction } from "../redux/reducers/transaction";

// Payment Modal
export const PeMo: React.FC = () => {
  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();
  const confirmPayment = useSelector(
    (state: RootState) => state.transaction.confirmPayment
  );
  const login = useSelector((state: RootState) => state.membership.login);
  const transaction = useSelector(
    (state: RootState) => state.transaction.transaction
  );

  const handleAggreePayment = () => {
    const accessToken = login.data?.data.token;
    const body = {
      service_code: confirmPayment?.data?.service_code,
    };

    const cbFulfilled = () => {
      dispatch(transactionAction.getBalanceThunk({ accessToken }));
    };

    dispatch(
      transactionAction.transactionThunk({ accessToken, body, cbFulfilled })
    );
  };

  const cancelPayment = () => {
    dispatch(transactionAction.clearPurchase());
    dispatch(transactionAction.closePayment());
  };

  return (
    <>
      <div
        role="alert"
        className="rounded-xl bg-none p-4 absolute inset-0 flex "
      >
        <div className="flex flex-col mx-auto p-4 rounded-md items-center bg-[#ffffff] gap-y-2 border-2 border-solid border-[#f5f5f5] justify-center h-[185.818px] w-[239.352px]">
          {transaction?.data?.status === 0 ? (
            <Icon
              icon="material-symbols:check-circle"
              color="#52bc94"
              width={48}
              height={48}
            />
          ) : (
            <Icon
              icon="mdi:wallet-outline"
              color="#f13b2f"
              width={48}
              height={48}
            />
          )}
          <div className="flex flex-col items-center">
            <p className="text-xs font-semibold text-[#9ca3af] text-center">
              {transaction?.data?.status === 0
                ? `Pembayaran ${transaction.data?.data?.service_name} senilai`
                : `${confirmPayment.data.service_name} senilai`}
            </p>
            <h1 className="font-bold">
              {transaction?.data?.status === 0
                ? `${rupiahWithNC(transaction.data?.data?.total_amount)}`
                : `${rupiahWithNC(confirmPayment.data?.service_tariff)} ?`}
            </h1>
            <p></p>
          </div>

          {transaction?.data?.status === 0 ? (
            <p className="text-[#9ca3af] text-xs font-bold">
              {transaction?.data?.message}
            </p>
          ) : (
            <button
              className="text-[#f13b2f] text-xs font-bold"
              onClick={handleAggreePayment}
            >
              ya lanjutkan Top Up
            </button>
          )}

          {transaction?.data?.status === 0 ? (
            <button
              className="text-[#f13b2f] text-xs font-semibold"
              onClick={cancelPayment}
            >
              Kembali ke beranda
            </button>
          ) : (
            <button className="text-[#9ca3af] text-xs" onClick={cancelPayment}>
              Batalkan
            </button>
          )}
        </div>
      </div>
    </>
  );
};

// TopUp Modal
export const ToMo: React.FC<{ [key: string]: any }> = ({
  setCancel,
  setAggree,
  onSuccess,
  onSuccessMsg,
  onComfirmAmount,
}) => {
  return (
    <>
      <div
        role="alert"
        className="rounded-xl bg-none p-4 absolute inset-0 flex"
      >
        <div className="flex flex-col mx-auto p-4 rounded-md items-center bg-[#ffffff] gap-y-2 border-2 border-solid border-[#f5f5f5] justify-center h-[185.818px] w-[239.352px]">
          {onSuccess ? (
            <Icon
              icon="material-symbols:check-circle"
              color="#52bc94"
              width={48}
              height={48}
            />
          ) : (
            <Icon
              icon="mdi:wallet-outline"
              color="#f13b2f"
              width={48}
              height={48}
            />
          )}

          {!onSuccess && (
            <div className="flex flex-col items-center">
              <p className="text-xs font-semibold text-[#9ca3af]">
                Anda yakin untuk Top Up sebesar
              </p>

              <h1 className="font-bold">{`${rupiahWithNC(
                onComfirmAmount
              )} ?`}</h1>
            </div>
          )}
          {onSuccess ? (
            <p className="text-[#9ca3af] text-xs font-bold">{onSuccessMsg}</p>
          ) : (
            <button
              className="text-[#f13b2f] text-xs font-bold"
              onClick={setAggree}
            >
              ya lanjutkan Top Up
            </button>
          )}

          {onSuccess ? (
            <button className="text-[#9ca3af] text-xs" onClick={setCancel}>
              Kembali ke beranda
            </button>
          ) : (
            <button className="text-[#9ca3af] text-xs" onClick={setCancel}>
              Batalkan
            </button>
          )}
        </div>
      </div>
    </>
  );
};
