import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Transaction actions
import {
  getBalanceThunk,
  topupThunk,
  transactionThunk,
  getTransactionHistoryThunk,
} from "../actions/transaction";

import { TransactionState } from "../../utils/types/reducer";

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
  // Top Up confirmation state
  confirmTopUp: {
    isFulfilled: false,
    isRejected: false,
    data: null,
  },
  purchase: {
    isFulfilled: false,
    isRejected: false,
    data: null,
  },
  transaction: {
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
    data: null,
    err: null,
  },
  // Payment confirmation state
  confirmPayment: {
    isFulfilled: false,
    isRejected: false,
    data: null,
  },
  getTransactionHistory: {
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
    data: null,
    err: null,
  },
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    confirmTopUp: (prevState, action) => {
      return {
        ...prevState,
        confirmTopUp: {
          isFulfilled: true,
          isRejected: false,
          data: action.payload,
        },
      };
    },
    closeTopUp: (prevState) => {
      return {
        ...prevState,
        confirmTopUp: {
          isFulfilled: false,
          isRejected: false,
          data: null,
        },
      };
    },
    clearTopUp: (prevState) => {
      return {
        ...prevState,
        topup: {
          isLoading: false,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };
    },
    purchase: (prevState, action) => {
      return {
        ...prevState,
        purchase: {
          isFulfilled: true,
          isRejected: false,
          data: action.payload,
        },
      };
    },
    clearPurchase: (prevState) => {
      return {
        ...prevState,
        purchase: {
          isFulfilled: false,
          isRejected: false,
          data: null,
        },
      };
    },
    confirmPayment: (prevState, action) => {
      return {
        ...prevState,
        confirmPayment: {
          isFulfilled: true,
          isRejected: false,
          data: action.payload,
        },
      };
    },
    closePayment: (prevState) => {
      return {
        ...prevState,
        confirmPayment: {
          isFulfilled: false,
          isRejected: false,
          data: null,
        },
        transaction: {
          isLoading: false,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };
    },
  },
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
