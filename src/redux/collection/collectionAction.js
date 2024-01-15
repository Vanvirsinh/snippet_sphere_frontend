import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const host = "https://snippetsphere.online";

export const createCollection = createAsyncThunk(
  "createCollection",
  async (data) => {
    const response = await fetch(`${host}/api/collection`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "auth-token": Cookies.get("user-token"),
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
);

export const fetchUserSpecCollection = createAsyncThunk(
  "fetchUserSpecCollection",
  async (username) => {
    const token = Cookies.get("user-token");
    const headers = token ? { "auth-token": token } : {};

    const response = await fetch(`${host}/api/collection/${username}`, {
      method: "GET",
      headers,
    });
    return response.json();
  }
);

export const fetchIndCollection = createAsyncThunk(
  "fetchIndCollection",
  async ({ username, collectionId }) => {
    const token = Cookies.get("user-token");
    const headers = token ? { "auth-token": token } : {};
    const response = await fetch(
      `${host}/api/collection/${username}/${collectionId}`,
      {
        method: "GET",
        headers,
      }
    );
    return response.json();
  }
);

export const updateCollection = createAsyncThunk(
  "updateCollection",
  async ({ data, collectionId }) => {
    const response = await fetch(
      `${host}/api/collection/update/${collectionId}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          "auth-token": Cookies.get("user-token"),
        },
        body: JSON.stringify(data),
      }
    );
    return response.json();
  }
);

export const deleteCollection = createAsyncThunk(
  "deleteCollection",
  async (collectionId) => {
    const response = await fetch(
      `${host}/api/collection/delete/${collectionId}`,
      {
        method: "DELETE",
        headers: {
          "auth-token": Cookies.get("user-token"),
        },
      }
    );
    return response.json();
  }
);
