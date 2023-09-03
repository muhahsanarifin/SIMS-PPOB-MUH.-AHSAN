import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { transactionAction } from "../redux/reducers/transaction";
import { rupiah, date } from "../helpers/intl";
import * as Loader from "../components/Loader";

export const Transaction: React.FC = () => {
  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();
  const login = useSelector((state: RootState) => state.membership.login);
  const transactionHitory = useSelector(
    (state: RootState) => state.transaction.getTransactionHistory
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const [offset, setOffset] = useState<any>(searchParams.get("offset") || 0);
  const [limit] = useState<any>(searchParams.get("limit") || 5);

  useEffect(() => {
    setSearchParams({
      offset: offset,
      limit: limit,
    });
  }, [setSearchParams, offset, limit]);

  //Get transaction history
  useEffect(() => {
    const accessToken = login.data?.data.token;
    const queryParams = searchParams;
    dispatch(
      transactionAction.getTransactionHistoryThunk({ accessToken, queryParams })
    );
  }, [dispatch, login.data?.data.token, searchParams]);

  // Handle show more
  const handleShowMore = () => {
    setOffset(offset + 1);
  };

  return (
    <>
      <h1 className="mb-2 font-semibold">Semua Transaksi</h1>
      <div className="flex flex-col">
        {transactionHitory.isLoading ? (
          <Loader.Transaction />
        ) : transactionHitory?.data?.data?.records.length === 0 ? (
          <p className="text-[#d4d4d4] font-semibold text-center py-8">
            Maaf tidak ada histori transaksi saat ini
          </p>
        ) : (
          <ul>
            {transactionHitory?.data?.data?.records.map((el: any, idx: any) => (
              <li
                key={idx}
                className="border-2 border-solid flex py-2 px-4 rounded-lg my-3"
              >
                <div>
                  <h1
                    className={`text-lg font-semibold ${
                      el.transaction_type === "TOPUP"
                        ? "text-[#4ade80]"
                        : "text-[#ef4444]"
                    }`}
                  >
                    {rupiah(el.total_amount, el.transaction_type === "TOPUP")}
                  </h1>
                  <p className="text-xs text-[#d4d4d4]">{el.invoice_number}</p>
                  <p className="text-xs text-[#262626] font-bold">
                    {date(new Date(el.created_on))}
                  </p>
                </div>
                <p className="text-xs font-bold ml-auto text-[#262626]">
                  {el.description}
                </p>
              </li>
            ))}
          </ul>
        )}
        {(transactionHitory?.data?.data?.records.length < 5 && offset === 0) ||
        transactionHitory?.data?.data?.records.length === 0 ? null : (
          <button
            className="text-[#ef392d] font-bold mx-auto mt-2 transition duration-500 hover:scale-105"
            onClick={handleShowMore}
          >
            Show more
          </button>
        )}
      </div>
    </>
  );
};
