import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  ArgRegistrationThunk,
  ArgLoginThunk,
  ArgGetProfileThunk,
  ArgupdateProfieThunk,
  ArgUpdateProfileImageThunk,
} from "../../utils/types/reducer";

import * as membership from "../../utils/api/membership";

export const registrationThunk = createAsyncThunk(
  "regisration",
  async ({ cbPending, cbFulfilled, cbFinally, body }: ArgRegistrationThunk) => {
    try {
      typeof cbPending === "function" && cbPending();
      const response = await membership.registration(body);
      // console.log("Data regisration:", response);
      typeof cbFulfilled === "function" && cbFulfilled(response);
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

export const loginThunk = createAsyncThunk(
  "login",
  async ({ cbPending, cbFulfilled, cbFinally, body }: ArgLoginThunk) => {
    try {
      typeof cbPending === "function" && cbPending();
      const response = await membership.login(body);
      // console.log("Data login:", response);
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

export const getProfileThunk = createAsyncThunk(
  "profile",
  async ({
    cbPending,
    cbFulfilled,
    cbFinally,
    accessToken,
  }: ArgGetProfileThunk) => {
    try {
      typeof cbPending === "function" && cbPending();
      const response = await membership.getProfile(accessToken);
      // console.log("Data get profile:", response);
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

export const updateProfieThunk = createAsyncThunk(
  "profile/update",
  async ({
    cbPending,
    cbFulfilled,
    cbFinally,
    accessToken,
    body,
  }: ArgupdateProfieThunk) => {
    try {
      typeof cbPending === "function" && cbPending();
      const response = await membership.updateProfile(accessToken, body);
      // console.log("Data update profile:", response);
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

export const updateProfileImageThunk = createAsyncThunk(
  "profile/image",
  async ({
    cbPending,
    cbFulfilled,
    cbFinally,
    body,
    accessToken,
  }: ArgUpdateProfileImageThunk) => {
    try {
      typeof cbPending === "function" && cbPending();
      const response = await membership.updateProfileImage(accessToken, body);
      // console.log("Data update profile image:", response);
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
