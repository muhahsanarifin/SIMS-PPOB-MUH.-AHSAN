import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Mermbership actions
import {
  registrationThunk,
  loginThunk,
  getProfileThunk,
  updateProfieThunk,
  updateProfileImageThunk,
} from "../actions/membership";

import { MembershipState } from "../../utils/types/reducer";

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
