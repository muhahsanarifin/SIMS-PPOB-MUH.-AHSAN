import Axios from "axios";

const BASE_URL = import.meta.env.VITE_API_SIMS_PPOB;


const config = (accessToken: string) => {
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
};

const anotherConfig = (accessToken: string) => {
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "multipart/form-data",
    },
  };
};

export const registration = (body: object) =>
  Axios.post(BASE_URL + "/registration", body);

export const login = (body: any) => Axios.post(BASE_URL + "/login", body);

export const getProfile = (accessToken: string) =>
  Axios.get(BASE_URL + "/profile", config(accessToken));

export const updateProfile = (accessToken: string, body: object) =>
  Axios.put(BASE_URL + "/profile/update", body, config(accessToken));

export const updateProfileImage = (accessToken: string, body: object) =>
  Axios.put(BASE_URL + "/profile/update", body, anotherConfig(accessToken));
