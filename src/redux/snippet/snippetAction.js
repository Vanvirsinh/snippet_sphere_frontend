import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const host = "https://snippetsphere.online";

export const createSnippet = createAsyncThunk(
  "createSnippet",
  async ({ username, collectionId, data }) => {
    const response = await fetch(
      `${host}/api/snippet/${username}/${collectionId}`,
      {
        method: "POST",
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

export const updateSnippet = createAsyncThunk(
  "updateSnippet",
  async ({ snippetId, data }) => {
    const response = await fetch(`${host}/api/snippet/update/${snippetId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "auth-token": Cookies.get("user-token"),
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
);

export const deleteSnippet = createAsyncThunk(
  "deleteSnippet",
  async (snippetId) => {
    const response = await fetch(`${host}/api/snippet/delete/${snippetId}`, {
      method: "DELETE",
      headers: {
        "auth-token": Cookies.get("user-token"),
      },
    });
    return response.json();
  }
);

export const fetchCollectionSpecSnippet = createAsyncThunk(
  "fetchCollectionSpecSnippet",
  async ({ username, collectionId }) => {
    const token = Cookies.get("user-token");
    const headers = token ? { "auth-token": token } : {};
    const response = await fetch(
      `${host}/api/snippet/${username}/collection/${collectionId}`,
      {
        method: "GET",
        headers,
      }
    );
    return response.json();
  }
);

export const fetchUserSpecSnippet = createAsyncThunk(
  "fetchUserSpecSnippet",
  async (username) => {
    const token = Cookies.get("user-token");
    const headers = token ? { "auth-token": token } : {};
    const response = await fetch(`${host}/api/snippet/${username}`, {
      method: "GET",
      headers,
    });
    return response.json();
  }
);

export const fetchIndSnippet = createAsyncThunk(
  "fetchIndSnippet",
  async ({ username, snippetId }) => {
    const token = Cookies.get("user-token");
    const headers = token ? { "auth-token": token } : {};
    const response = await fetch(
      `${host}/api/snippet/${username}/${snippetId}`,
      {
        method: "GET",
        headers,
      }
    );
    return response.json();
  }
);

export const fetchAllSnippets = createAsyncThunk(
  "fetchAllSnippets",
  async ({ page, query }) => {
    const response = await fetch(
      `${host}/api/snippet?page=${page}&search=${query}`,
      {
        method: "GET",
      }
    );
    return response.json();
  }
);

export const fetchPinnedSnippets = createAsyncThunk(
  "fetchPinnedSnippets",
  async ({ username }) => {
    const token = Cookies.get("user-token");
    const headers = token ? { "auth-token": token } : {};
    const response = await fetch(
      `${host}/api/snippet/pinned-snippets/${username}`,
      {
        method: "GET",
        headers
      }
    );
    return response.json();
  }
);

export const pinSnippet = createAsyncThunk("pinSnippet", async (snippetId) => {
  const token = Cookies.get("user-token");
  const headers = token ? { "auth-token": token } : {};
  const response = await fetch(`${host}/api/pin/${snippetId}`, {
    method: "POST",
    headers,
  });
  return response.json();
});

export const likeSnippet = createAsyncThunk("likeSnippet", async (snippetId) => {
  const token = Cookies.get("user-token");
  const headers = token ? { "auth-token": token } : {};
  const response = await fetch(`${host}/api/like/${snippetId}`, {
    method: "POST",
    headers,
  });
  return response.json();
});
