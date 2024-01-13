import { createSlice } from "@reduxjs/toolkit";
import { sendOtp } from "../actions/userAction";
import { registerUser } from "../actions/userAction";
import { getUser } from "../actions/userAction";
import { login } from "../actions/userAction";
import { resetPassword } from "../actions/userAction";
import { sendOtpForgetPassword } from "../actions/userAction";
import { forgetPassword } from "../actions/userAction";

const userSlice = createSlice({
  name: "User",
  initialState: {
    otp: {
      message: null,
      isLoading: false,
      isError: false,
      user: null,
    },
    sendOtpForgetPassword: {
      isLoading: false,
      response: null,
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
    resetPassword: {
      isLoading: false,
      response: null,
    },
    forgetPassword: {
      isLoading: false,
      response: null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOtp.pending, (state, action) => {
        state.otp.isLoading = true;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.otp.isLoading = false;
        state.otp.message = action.payload;
        state.otp.user = action.payload.user;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.otp.isLoading = false;
        state.otp.message = action.payload;
        state.otp.isError = true;
      });
    // Register User
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.user.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user.isLoading = false;
        state.user.response = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.user.isLoading = false;
        state.user.response = action.payload;
        state.user.isError = true;
      });

    // Login
    builder
      .addCase(login.pending, (state, action) => {
        state.user.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user.isLoading = false;
        state.user.response = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.user.isLoading = false;
        state.user.response = action.payload;
        state.user.isError = true;
      });

    // Get User
    builder
      .addCase(getUser.pending, (state, action) => {
        state.authUser.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.authUser.isLoading = false;
        state.authUser.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.authUser.isLoading = false;
        state.authUser.user = action.payload;
      });

    // Reset Password
    builder
      .addCase(resetPassword.pending, (state, action) => {
        state.resetPassword.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.resetPassword.isLoading = false;
        state.resetPassword.response = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.resetPassword.isLoading = false;
        state.resetPassword.response = action.payload;
      });

    // Send OTP Forget Password
    builder
      .addCase(sendOtpForgetPassword.pending, (state, action) => {
        state.sendOtpForgetPassword.isLoading = true;
      })
      .addCase(sendOtpForgetPassword.fulfilled, (state, action) => {
        state.sendOtpForgetPassword.isLoading = false;
        state.sendOtpForgetPassword.response = action.payload;
      })
      .addCase(sendOtpForgetPassword.rejected, (state, action) => {
        state.sendOtpForgetPassword.isLoading = false;
        state.sendOtpForgetPassword.response = action.payload;
      });

      // Forget Password
    builder
    .addCase(forgetPassword.pending, (state, action) => {
      state.forgetPassword.isLoading = true;
    })
    .addCase(forgetPassword.fulfilled, (state, action) => {
      state.forgetPassword.isLoading = false;
      state.forgetPassword.response = action.payload;
    })
    .addCase(forgetPassword.rejected, (state, action) => {
      state.forgetPassword.isLoading = false;
      state.forgetPassword.response = action.payload;
    });
  },
});

export default userSlice.reducer;
