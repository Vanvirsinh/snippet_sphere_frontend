import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const host = "https://snippetsphere.online";

// Fetch User Profile
export const fetchUserProfile = createAsyncThunk(
  "fetchUserProfile",
  async (username) => {
    const response = await fetch(`${host}/api/profile/${username}`, {
      method: "GET",
    });
    return response.json();
  }
);

// Create User Profile
export const createProfile = createAsyncThunk(
  "createProfile",
  async (formData) => {
    const token = Cookies.get("user-token");
    const response = await fetch(`${host}/api/profile/add-profile`, {
      method: "POST",
      headers: {
        "auth-token": token,
        accept: "application/json",
      },
      body: formData,
    });
    return response.json();
  }
);

// Follow User
export const followUser = createAsyncThunk(
  "followUser",
  async ({ username, token }) => {
    const response = await fetch(`${host}/api/follow/${username}`, {
      method: "POST",
      headers: {
        "auth-token": token,
      },
    });
    return response.json();
  }
);
