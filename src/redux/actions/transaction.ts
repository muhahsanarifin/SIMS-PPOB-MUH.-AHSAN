import { createAsyncThunk } from "@reduxjs/toolkit";

import * as transaction from "../../utils/api/transaction";

import {
  ArgGetBalanceThunk,
  ArgTopUp,
  ArgTransactionThunk,
  ArgGetTransactionHistoryThunk,
} from "../../utils/types/reducer";

export const getBalanceThunk = createAsyncThunk(
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
      // console.log("Data get balance:", response);
      typeof cbFulfilled === "function" && cbFulfilled(response.data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        // console.error(error.response);
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

export const topupThunk = createAsyncThunk(
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
      // console.log("Data topup:", response);
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

export const transactionThunk = createAsyncThunk(
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
      const response = await transaction.transaction(accessToken, body);
      // console.log("Data transaction:", response);
      typeof cbFulfilled === "function" && cbFulfilled(response.data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        // console.error(error.response);
        throw error.response;
      } else {
        // console.error(error);
        throw error;
      }
    } finally {
      typeof cbFinally === "function" && cbFinally();
    }
  }
);

export const getTransactionHistoryThunk = createAsyncThunk(
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
      // console.log("Data history transaction:", response);
      typeof cbFulfilled === "function" && cbFulfilled(response.data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        // console.error(error.response);
        throw error.response;
      } else {
        // console.error(error);
        throw error;
      }
    } finally {
      typeof cbFinally === "function" && cbFinally();
    }
  }
);

