import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import {
  MembershipState,
  ArgRegistrationThunk,
  ArgLoginThunk,
  ArgGetProfileThunk,
  ArgupdateProfieThunk,
  ArgUpdateProfileImageThunk,
} from "../../utils/types/reducer";

import * as membership from "../../utils/api/membership";

const initialState: MembershipState = {
  registration: {
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
    data: null,
    err: null,
  },
  login: {
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
    data: null,
    err: null,
  },
  getProfile: {
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
    data: null,
    err: null,
  },
  updateProfile: {
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
    data: null,
    err: null,
  },
  updateProfileImage: {
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
    data: null,
    err: null,
  },
};

const registrationThunk = createAsyncThunk(
  "regisration",
  async ({ cbPending, cbFulfilled, cbFinally, body }: ArgRegistrationThunk) => {
    try {
      typeof cbPending === "function" && cbPending();
      const response = await membership.registration(body);
      console.log("Data regisration:", response);
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

const loginThunk = createAsyncThunk(
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

const getProfileThunk = createAsyncThunk(
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
      console.log("Data get profile:", response);
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

const updateProfieThunk = createAsyncThunk(
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
      console.log("Data update profile:", response);
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

const updateProfileImageThunk = createAsyncThunk(
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
      console.log("Data update profile image:", response);
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

const membershipSlice = createSlice({
  name: "membership",
  initialState,
  reducers: {
    logout: (prevState) => {
      return {
        ...prevState,
        login: {
          isLoading: false,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };
    },
    close: (prevState) => {
      return {
        ...prevState,
        login: {
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
    builder.addCase(registrationThunk.pending, (prevState) => {
      return {
        ...prevState,
        registration: {
          isLoading: true,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };
    });
    builder.addCase(
      registrationThunk.fulfilled,
      (prevState, action: PayloadAction<any>) => {
        return {
          ...prevState,
          registration: {
            isLoading: false,
            isFulfilled: true,
            isRejected: false,
            data: action.payload,
            err: null,
          },
        };
      }
    );
    builder.addCase(registrationThunk.rejected, (prevState, action) => {
      return {
        ...prevState,
        registration: {
          isLoading: false,
          isFulfilled: false,
          isRejected: true,
          data: { msg: action.error.message },
          err: action.error.message,
        },
      };
    });
    builder.addCase(loginThunk.pending, (prevState) => {
      return {
        ...prevState,
        login: {
          isLoading: true,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };
    });
    builder.addCase(
      loginThunk.fulfilled,
      (prevState, action: PayloadAction<any>) => {
        return {
          ...prevState,
          login: {
            isLoading: false,
            isFulfilled: true,
            isRejected: false,
            data: action.payload,
            err: null,
          },
        };
      }
    );
    builder.addCase(loginThunk.rejected, (prevState, action) => {
      return {
        ...prevState,
        login: {
          isLoading: false,
          isFulfilled: false,
          isRejected: true,
          data: action,
          err: action.error.message,
        },
      };
    });
    builder.addCase(getProfileThunk.pending, (prevState) => {
      return {
        ...prevState,
        getProfile: {
          isLoading: true,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };
    });
    builder.addCase(
      getProfileThunk.fulfilled,
      (prevState, action: PayloadAction<any>) => {
        return {
          ...prevState,
          getProfile: {
            isLoading: false,
            isFulfilled: true,
            isRejected: false,
            data: action.payload,
            err: null,
          },
        };
      }
    );
    builder.addCase(getProfileThunk.rejected, (prevState, action) => {
      return {
        ...prevState,
        getProfile: {
          isLoading: false,
          isFulfilled: false,
          isRejected: true,
          data: action,
          err: action.error.message,
        },
      };
    });
    builder.addCase(updateProfieThunk.pending, (prevState) => {
      return {
        ...prevState,
        updateProfile: {
          isLoading: true,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };
    });
    builder.addCase(
      updateProfieThunk.fulfilled,
      (prevState, action: PayloadAction<any>) => {
        return {
          ...prevState,
          updateProfile: {
            isLoading: false,
            isFulfilled: true,
            isRejected: false,
            data: action.payload,
            err: null,
          },
        };
      }
    );
    builder.addCase(updateProfieThunk.rejected, (prevState, action) => {
      return {
        ...prevState,
        updateProfile: {
          isLoading: false,
          isFulfilled: false,
          isRejected: true,
          data: action,
          err: action.error.message,
        },
      };
    });
    builder.addCase(updateProfileImageThunk.pending, (prevState) => {
      return {
        ...prevState,
        updateProfileImage: {
          isLoading: true,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };
    });
    builder.addCase(
      updateProfileImageThunk.fulfilled,
      (prevState, action: PayloadAction<any>) => {
        return {
          ...prevState,
          updateProfileImage: {
            isLoading: false,
            isFulfilled: true,
            isRejected: false,
            data: action.payload,
            err: null,
          },
        };
      }
    );
    builder.addCase(updateProfileImageThunk.rejected, (prevState, action) => {
      return {
        ...prevState,
        updateProfileImage: {
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

export const membershipAction = {
  ...membershipSlice.actions,
  registrationThunk,
  loginThunk,
  getProfileThunk,
  updateProfieThunk,
  updateProfileImageThunk,
};

export default membershipSlice.reducer;
