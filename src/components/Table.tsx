import React from "react";

export const Transaction: React.FC = () => {
  return (
    <>
      <h1 className="mb-2 font-semibold">Semua Transaksi</h1>
      <div className="flex flex-col">
        <ul>
          {new Array(4).fill(1).map((_, idx) => (
            <li key={idx} className="border-2 border-solid flex py-2 px-4 rounded-lg my-3">
              <div>
                <h1 className="text-lg font-semibold">+ Rp.1000</h1>
                <p className="text-xs">17 Agustus 2023 20:21</p>
              </div>
              <p className="text-xs font-bold ml-auto">
                Top up saldo
              </p>
            </li>
          ))}
        </ul>
        <button className="text-[#ef392d] font-bold mx-auto mt-2">Show more</button>
      </div>
    </>
  );
};
