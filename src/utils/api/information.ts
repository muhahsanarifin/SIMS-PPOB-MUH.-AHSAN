import Axios from "axios";

const BASE_URL = import.meta.env.VITE_API_SIMS_PPOB;

const config = (accessToken: string) => {
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
};

export const getBanner = (accessToken: string) =>
  Axios.get(BASE_URL + "/banner", config(accessToken));

export const getServices = (accessToken: string) =>
  Axios.get(BASE_URL + "/services", config(accessToken));
