import { createSlice } from "@reduxjs/toolkit";
import { sendOtp } from "../actions/userAction";
import { registerUser } from "../actions/userAction";
import { getUser } from "../actions/userAction";
import { login } from "../actions/userAction";

const userSlice = createSlice({
  name: "User",
  initialState: {
    otp: {
      message: null,
      isLoading: false,
      isError: false,
      user: null,
    },
    user: {
      isLoading: false,
      isError: false,
      response: null,
    },
    authUser: {
      user: null,
      isLoading: false,
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendOtp.pending, (state, action) => {
      state.otp.isLoading = true;
    });
    builder.addCase(sendOtp.fulfilled, (state, action) => {
      state.otp.isLoading = false;
      state.otp.message = action.payload;
      state.otp.user = action.payload.user;
    });
    builder.addCase(sendOtp.rejected, (state, action) => {
      state.otp.isLoading = false;
      state.otp.message = action.payload;
      state.otp.isError = true;
    });
    // Register User
    builder.addCase(registerUser.pending, (state, action) => {
      state.user.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user.isLoading = false;
      state.user.response = action.payload;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.user.isLoading = false;
      state.user.response = action.payload;
      state.user.isError = true;
    });

    // Login
    builder.addCase(login.pending, (state, action) => {
      state.user.isLoading = true;
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.user.isLoading = false;
      state.user.response = action.payload;
    })
    builder.addCase(login.rejected, (state, action) => {
      state.user.isLoading = false;
      state.user.response = action.payload;
      state.user.isError = true;
    })

    // Get User
    builder.addCase(getUser.pending, (state, action) => {
      state.authUser.isLoading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.authUser.isLoading = false;
      state.authUser.user = action.payload;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.authUser.isLoading = false;
      state.authUser.user = action.payload;
    });
  },
});

export default userSlice.reducer;
