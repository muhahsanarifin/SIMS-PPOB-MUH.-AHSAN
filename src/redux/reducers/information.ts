import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Information actions
import { getBannerThunk, getServicesThunk } from "../actions/information";

import { InformationState } from "../../utils/types/reducer";

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
          data: action,
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
          data: action,
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
