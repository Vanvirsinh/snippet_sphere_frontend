import { createSlice } from "@reduxjs/toolkit";
import { createSnippet } from "./snippetAction";
import { fetchCollectionSpecSnippet } from "./snippetAction";
import { fetchIndSnippet } from "./snippetAction";
import { updateSnippet } from "./snippetAction";
import { deleteSnippet } from "./snippetAction";
import { fetchUserSpecSnippet } from "./snippetAction";
import { fetchAllSnippets } from "./snippetAction";
import { pinSnippet } from "./snippetAction";
import { likeSnippet } from "./snippetAction";
import { fetchPinnedSnippets } from "./snippetAction";

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
    userSpecSnippets: {
      isLoading: false,
      response: null,
    },
    individualSnippet: {
      isLoading: false,
      response: null,
    },
    allSnippets: {
      isLoading: false,
      response: null,
    },
    pinSnippetData: {
      isLoading: false,
      response: null,
    },
    likeSnippetData: {
      isLoading: false,
      response: null,
    },
    pinnedSnippets: {
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

    // Delete Snippet
    builder
      .addCase(deleteSnippet.pending, (state, action) => {
        state.createSnippet.isLoading = true;
      })
      .addCase(deleteSnippet.fulfilled, (state, action) => {
        state.createSnippet.isLoading = false;
        state.createSnippet.response = action.payload;
      })
      .addCase(deleteSnippet.rejected, (state, action) => {
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

    // Fetch User Specific Snippet
    builder
      .addCase(fetchUserSpecSnippet.pending, (state, action) => {
        state.userSpecSnippets.isLoading = true;
      })
      .addCase(fetchUserSpecSnippet.fulfilled, (state, action) => {
        state.userSpecSnippets.isLoading = false;
        state.userSpecSnippets.response = action.payload;
      })
      .addCase(fetchUserSpecSnippet.rejected, (state, action) => {
        state.userSpecSnippets.isLoading = false;
        state.userSpecSnippets.response = action.payload;
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

    // Fetch All Public Snippets
    builder
      .addCase(fetchAllSnippets.pending, (state, action) => {
        state.allSnippets.isLoading = true;
      })
      .addCase(fetchAllSnippets.fulfilled, (state, action) => {
        state.allSnippets.isLoading = false;
        state.allSnippets.response = action.payload;
      })
      .addCase(fetchAllSnippets.rejected, (state, action) => {
        state.allSnippets.isLoading = false;
        state.allSnippets.response = action.payload;
      });

    // Fetch Pinned Snippets
    builder
      .addCase(fetchPinnedSnippets.pending, (state, action) => {
        state.pinnedSnippets.isLoading = true;
      })
      .addCase(fetchPinnedSnippets.fulfilled, (state, action) => {
        state.pinnedSnippets.isLoading = false;
        state.pinnedSnippets.response = action.payload;
      })
      .addCase(fetchPinnedSnippets.rejected, (state, action) => {
        state.pinnedSnippets.isLoading = false;
        state.pinnedSnippets.response = action.payload;
      });

    // Pin Public Snippets
    builder
      .addCase(pinSnippet.pending, (state, action) => {
        state.pinSnippetData.isLoading = true;
      })
      .addCase(pinSnippet.fulfilled, (state, action) => {
        state.pinSnippetData.isLoading = false;
        state.pinSnippetData.response = action.payload;
      })
      .addCase(pinSnippet.rejected, (state, action) => {
        state.pinSnippetData.isLoading = false;
        state.pinSnippetData.response = action.payload;
      });

    // Like Public Snippets
    builder
      .addCase(likeSnippet.pending, (state, action) => {
        state.likeSnippetData.isLoading = true;
      })
      .addCase(likeSnippet.fulfilled, (state, action) => {
        state.likeSnippetData.isLoading = false;
        state.likeSnippetData.response = action.payload;
      })
      .addCase(likeSnippet.rejected, (state, action) => {
        state.likeSnippetData.isLoading = false;
        state.likeSnippetData.response = action.payload;
      });
  },
});

export default snippetSlice.reducer;
