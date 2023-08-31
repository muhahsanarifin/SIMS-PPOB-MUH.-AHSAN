import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import {
  TransactionState,
  ArgGetBalanceThunk,
  ArgTopUp,
  ArgTransactionThunk,
  ArgGetTransactionHistoryThunk,
} from "../../utils/types/reducer";

import * as transaction from "../../utils/api/transaction";

const initialState: TransactionState = {
  getBalance: {
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
    data: null,
    err: null,
  },
  topup: {
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
    data: null,
    err: null,
  },
  transaction: {
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
    data: null,
    err: null,
  },
  getTransactionHistory: {
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
    data: null,
    err: null,
  },
};

const getBalanceThunk = createAsyncThunk(
  "balance",
  async ({
    cbPending,
    cbFulfilled,
    cbFinally,
    accessToken,
  }: ArgGetBalanceThunk) => {
    try {
      typeof cbPending === "function" && cbPending();
      const response = await transaction.getBalance(accessToken);
      console.log("Data get balance:", response);
      typeof cbFulfilled === "function" && cbFulfilled(response.data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        console.error(error.response);
        throw error.response.data;
      } else {
        console.error(error);
        throw error;
      }
    } finally {
      typeof cbFinally === "function" && cbFinally();
    }
  }
);

const topupThunk = createAsyncThunk(
  "topup",
  async ({
    cbPending,
    cbFulfilled,
    cbFinally,
    accessToken,
    body,
  }: ArgTopUp) => {
    try {
      typeof cbPending === "function" && cbPending();
      const response = await transaction.topup(accessToken, body);
      console.log("Data topup:", response);
      typeof cbFulfilled === "function" && cbFulfilled(response.data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        console.error(error.response.data);
        throw error.response.data;
      } else {
        console.error(error);
        throw error;
      }
    } finally {
      typeof cbFinally === "function" && cbFinally();
    }
  }
);

const transactionThunk = createAsyncThunk(
  "transaction",
  async ({
    cbPending,
    cbFulfilled,
    cbFinally,
    accessToken,
    body,
  }: ArgTransactionThunk) => {
    try {
      typeof cbPending === "function" && cbPending();
      const response = await transaction.topup(accessToken, body);
      console.log("Data transaction:", response);
      typeof cbFulfilled === "function" && cbFulfilled(response.data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        console.error(error.response);
        throw error.response;
      } else {
        console.error(error);
        throw error;
      }
    } finally {
      typeof cbFinally === "function" && cbFinally();
    }
  }
);

const getTransactionHistoryThunk = createAsyncThunk(
  "transaction/history",
  async ({
    cbPending,
    cbFulfilled,
    cbFinally,
    accessToken,
    queryParams,
  }: ArgGetTransactionHistoryThunk) => {
    try {
      typeof cbPending === "function" && cbPending();
      const response = await transaction.getTransactionHistory(
        accessToken,
        queryParams
      );
      console.log("Data history transaction:", response);
      typeof cbFulfilled === "function" && cbFulfilled(response.data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        console.error(error.response);
        throw error.response;
      } else {
        console.error(error);
        throw error;
      }
    } finally {
      typeof cbFinally === "function" && cbFinally();
    }
  }
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBalanceThunk.pending, (prevState) => {
      return {
        ...prevState,
        getBalance: {
          isLoading: true,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };
    });
    builder.addCase(
      getBalanceThunk.fulfilled,
      (prevState, action: PayloadAction<any>) => {
        return {
          ...prevState,
          getBalance: {
            isLoading: false,
            isFulfilled: true,
            isRejected: false,
            data: action.payload,
            err: null,
          },
        };
      }
    );
    builder.addCase(getBalanceThunk.rejected, (prevState, action) => {
      return {
        ...prevState,
        getBalance: {
          isLoading: false,
          isFulfilled: false,
          isRejected: true,
          data: action,
          err: action.error.message,
        },
      };
    });
    builder.addCase(topupThunk.pending, (prevState) => {
      return {
        ...prevState,
        topup: {
          isLoading: true,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };
    });
    builder.addCase(
      topupThunk.fulfilled,
      (prevState, action: PayloadAction<any>) => {
        return {
          ...prevState,
          topup: {
            isLoading: false,
            isFulfilled: true,
            isRejected: false,
            data: action.payload,
            err: null,
          },
        };
      }
    );
    builder.addCase(topupThunk.rejected, (prevState, action) => {
      return {
        ...prevState,
        topup: {
          isLoading: false,
          isFulfilled: false,
          isRejected: true,
          data: action,
          err: action.error.message,
        },
      };
    });
    builder.addCase(transactionThunk.pending, (prevState) => {
      return {
        ...prevState,
        transaction: {
          isLoading: true,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };
    });
    builder.addCase(
      transactionThunk.fulfilled,
      (prevState, action: PayloadAction<any>) => {
        return {
          ...prevState,
          transaction: {
            isLoading: false,
            isFulfilled: true,
            isRejected: false,
            data: action.payload,
            err: null,
          },
        };
      }
    );
    builder.addCase(transactionThunk.rejected, (prevState, action) => {
      return {
        ...prevState,
        transaction: {
          isLoading: false,
          isFulfilled: false,
          isRejected: true,
          data: action,
          err: action.error.message,
        },
      };
    });
    builder.addCase(getTransactionHistoryThunk.pending, (prevState) => {
      return {
        ...prevState,
        getTransactionHistory: {
          isLoading: true,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };
    });
    builder.addCase(
      getTransactionHistoryThunk.fulfilled,
      (prevState, action: PayloadAction<any>) => {
        return {
          ...prevState,
          getTransactionHistory: {
            isLoading: false,
            isFulfilled: true,
            isRejected: false,
            data: action.payload,
            err: null,
          },
        };
      }
    );
    builder.addCase(
      getTransactionHistoryThunk.rejected,
      (prevState, action) => {
        return {
          ...prevState,
          getTransactionHistory: {
            isLoading: false,
            isFulfilled: false,
            isRejected: true,
            data: action,
            err: action.error.message,
          },
        };
      }
    );
  },
});

export const transactionAction = {
  ...transactionSlice.actions,
  getBalanceThunk,
  topupThunk,
  transactionThunk,
  getTransactionHistoryThunk,
};

export default transactionSlice.reducer;
