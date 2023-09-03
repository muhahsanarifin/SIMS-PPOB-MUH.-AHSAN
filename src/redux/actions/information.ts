import { createAsyncThunk } from "@reduxjs/toolkit";

import * as information from "../../utils/api/information";

import {
  ArgGetBannerThunk,
  ArgGetServicesThunk,
} from "../../utils/types/reducer";

export const getBannerThunk = createAsyncThunk(
  "banner",
  async ({
    cbPending,
    cbFulfilled,
    cbFinally,
    accessToken,
  }: ArgGetBannerThunk) => {
    try {
      typeof cbPending === "function" && cbPending();
      const response = await information.getBanner(accessToken);
      // console.log("Data get banner:", response);
      typeof cbFulfilled === "function" && cbFulfilled(response.data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        // console.error(error.response.data);
        throw error.response.data;
      } else {
        // console.error(error);
        throw error;
      }
    } finally {
      typeof cbFinally === "function" && cbFinally();
    }
  }
);

export const getServicesThunk = createAsyncThunk(
  "service",
  async ({
    cbPending,
    cbFulfilled,
    cbFinally,
    accessToken,
  }: ArgGetServicesThunk) => {
    try {
      typeof cbPending === "function" && cbPending();
      const response = await information.getServices(accessToken);
      // console.log("Data get services:", response);
      typeof cbFulfilled === "function" && cbFulfilled(response.data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        // console.error(error.response.data);
        throw error.response.data;
      } else {
        // console.error(error);
        throw error;
      }
    } finally {
      typeof cbFinally === "function" && cbFinally();
    }
  }
);
