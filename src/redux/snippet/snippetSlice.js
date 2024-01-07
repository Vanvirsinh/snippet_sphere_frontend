import { createSlice } from "@reduxjs/toolkit";
import { createSnippet } from "./snippetAction";
import { fetchCollectionSpecSnippet } from "./snippetAction";
import { fetchIndSnippet } from "./snippetAction";
import { updateSnippet } from "./snippetAction";

const snippetSlice = createSlice({
  name: "Snippet",
  initialState: {
    createSnippet: {
      isLoading: false,
      response: null,
    },
    collectionSpecSnippets: {
      isLoading: false,
      response: null,
    },
    individualSnippet: {
      isLoading: false,
      response: null,
    },
  },
  extraReducers: (builder) => {
    // Create Snippet
    builder
      .addCase(createSnippet.pending, (state, action) => {
        state.createSnippet.isLoading = true;
      })
      .addCase(createSnippet.fulfilled, (state, action) => {
        state.createSnippet.isLoading = false;
        state.createSnippet.response = action.payload;
      })
      .addCase(createSnippet.rejected, (state, action) => {
        state.createSnippet.isLoading = false;
        state.createSnippet.response = action.payload;
      });

    // Update Snippet
    builder
      .addCase(updateSnippet.pending, (state, action) => {
        state.createSnippet.isLoading = true;
      })
      .addCase(updateSnippet.fulfilled, (state, action) => {
        state.createSnippet.isLoading = false;
        state.createSnippet.response = action.payload;
      })
      .addCase(updateSnippet.rejected, (state, action) => {
        state.createSnippet.isLoading = false;
        state.createSnippet.response = action.payload;
      });

    // Fetch Collection Specific Snippet
    builder
      .addCase(fetchCollectionSpecSnippet.pending, (state, action) => {
        state.collectionSpecSnippets.isLoading = true;
      })
      .addCase(fetchCollectionSpecSnippet.fulfilled, (state, action) => {
        state.collectionSpecSnippets.isLoading = false;
        state.collectionSpecSnippets.response = action.payload;
      })
      .addCase(fetchCollectionSpecSnippet.rejected, (state, action) => {
        state.collectionSpecSnippets.isLoading = false;
        state.collectionSpecSnippets.response = action.payload;
      });

    // Fetch Individual Snippet
    builder
      .addCase(fetchIndSnippet.pending, (state, action) => {
        state.individualSnippet.isLoading = true;
      })
      .addCase(fetchIndSnippet.fulfilled, (state, action) => {
        state.individualSnippet.isLoading = false;
        state.individualSnippet.response = action.payload;
      })
      .addCase(fetchIndSnippet.rejected, (state, action) => {
        state.individualSnippet.isLoading = false;
        state.individualSnippet.response = action.payload;
      });
  },
});

export default snippetSlice.reducer;
