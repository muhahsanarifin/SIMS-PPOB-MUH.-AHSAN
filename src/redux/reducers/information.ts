import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import {
  InformationState,
  ArgGetBannerThunk,
  ArgGetServicesThunk,
} from "../../utils/types/reducer";

import * as information from "../../utils/api/information";

const initialState: InformationState = {
  getBanner: {
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
    data: null,
    err: null,
  },
  getService: {
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
    data: null,
    err: null,
  },
};

const getBannerThunk = createAsyncThunk(
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
      console.log("Data get banner:", response);
      typeof cbFulfilled === "function" && cbFulfilled(response.data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        console.error(error.response.data?.msg);
        throw error.response.data?.msg;
      } else {
        console.error(error);
        throw error;
      }
    } finally {
      typeof cbFinally === "function" && cbFinally();
    }
  }
);

const getServicesThunk = createAsyncThunk(
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
      console.log("Data get services:", response);
      typeof cbFulfilled === "function" && cbFulfilled(response.data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        console.error(error.response.data?.msg);
        throw error.response.data?.msg;
      } else {
        console.error(error);
        throw error;
      }
    } finally {
      typeof cbFinally === "function" && cbFinally();
    }
  }
);

const informationSlice = createSlice({
  name: "information",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBannerThunk.pending, (prevState) => {
      return {
        ...prevState,
        getBanner: {
          isLoading: true,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };
    });
    builder.addCase(
      getBannerThunk.fulfilled,
      (prevState, action: PayloadAction<any>) => {
        return {
          ...prevState,
          getBanner: {
            isLoading: false,
            isFulfilled: true,
            isRejected: false,
            data: action.payload,
            err: null,
          },
        };
      }
    );
    builder.addCase(getBannerThunk.rejected, (prevState, action) => {
      return {
        ...prevState,
        getBanner: {
          isLoading: false,
          isFulfilled: false,
          isRejected: true,
          data: { msg: action.error.message },
          err: action.error.message,
        },
      };
    });
    builder.addCase(getServicesThunk.pending, (prevState) => {
      return {
        ...prevState,
        getService: {
          isLoading: true,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };
    });
    builder.addCase(
      getServicesThunk.fulfilled,
      (prevState, action: PayloadAction<any>) => {
        return {
          ...prevState,
          getService: {
            isLoading: false,
            isFulfilled: true,
            isRejected: false,
            data: action.payload,
            err: null,
          },
        };
      }
    );
    builder.addCase(getServicesThunk.rejected, (prevState, action) => {
      return {
        ...prevState,
        getService: {
          isLoading: false,
          isFulfilled: false,
          isRejected: true,
          data: { msg: action.error.message },
          err: action.error.message,
        },
      };
    });
  },
});

export const informationAction = {
  ...informationSlice.actions,
  getBannerThunk,
  getServicesThunk,
};

export default informationSlice.reducer;
