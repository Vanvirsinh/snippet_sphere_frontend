import { createAsyncThunk } from "@reduxjs/toolkit";

const host = "http://localhost:8000";

export const sendOtp = createAsyncThunk("sendOtp", async (data) => {
  const response = await fetch(`${host}/api/auth/send-otp`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
});

export const registerUser = createAsyncThunk("registerUser", async (data) => {
  const response = await fetch(`${host}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
});

export const getUser = createAsyncThunk("getUser", async (token) => {
  if (token) {
    const response = await fetch(`${host}/api/auth/getUser`, {
      method: "GET",
      headers: {
        "auth-token": token,
      },
    });
    return response.json();
  }
});

export const login = createAsyncThunk("login", async (data) => {
  const response = await fetch(`${host}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
});

export const resetPassword = createAsyncThunk(
  "resetPassword",
  async ({ token, data }) => {
    const response = await fetch(`${host}/api/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
);

export const sendOtpForgetPassword = createAsyncThunk("sendOtpForgetPassword", async (data) => {
  const response = await fetch(`${host}/api/auth/send-otp-forget-password`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
});

export const forgetPassword = createAsyncThunk("forgetPassword", async (data) => {
  const response = await fetch(`${host}/api/auth/forget-password`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
});
