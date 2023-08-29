import Axios from "axios";

const BASE_URL = import.meta.env.VITE_API_SIMS_PPOB;

const config = (accessToken: string) => {
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
};

export const getBalance = (accessToken: string) =>
  Axios.get(BASE_URL + "/balance", config(accessToken));

export const topup = (accessToken: string, body: object) =>
  Axios.post(BASE_URL + "/topup", body, config(accessToken));

export const transaction = (accessToken: string, body: object) =>
  Axios.post(BASE_URL + "/transaction", body, config(accessToken));

export const getTransactionHistory = (accessToken: string) =>
  Axios.get(BASE_URL + "/transaction/history", config(accessToken));
