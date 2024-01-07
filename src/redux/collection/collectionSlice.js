import { createSlice } from "@reduxjs/toolkit";
import { createCollection } from "./collectionAction";
import { fetchUserSpecCollection } from "./collectionAction";
import { updateCollection } from "./collectionAction";
import { deleteCollection } from "./collectionAction";
import { fetchIndCollection } from "./collectionAction";

const collectionSlice = createSlice({
  name: "Collection",
  initialState: {
    collection: {
      isLoading: false,
      collection: null,
    },
    userSpecCollection: {
      isLoading: false,
      collection: null,
    },
    updateCollection: {
      isLoading: false,
      response: null,
    },
    deleteCollection: {
      isLoading: false,
      response: null,
    },
    individualCollection: {
      isLoading: false,
      response: null,
    },
  },
  extraReducers: (builder) => {
    // Create Collection
    builder.addCase(createCollection.pending, (state) => {
      state.collection.isLoading = true;
    });
    builder.addCase(createCollection.fulfilled, (state, action) => {
      state.collection.isLoading = false;
      state.collection.collection = action.payload;
    });
    builder.addCase(createCollection.rejected, (state, action) => {
      state.collection.isLoading = false;
      state.collection.collection = action.payload;
    });

    // Fetch User Specific Collection
    builder
      .addCase(fetchUserSpecCollection.pending, (state) => {
        state.userSpecCollection.isLoading = true;
      })
      .addCase(fetchUserSpecCollection.fulfilled, (state, action) => {
        state.userSpecCollection.isLoading = false;
        state.userSpecCollection.collection = action.payload;
      })
      .addCase(fetchUserSpecCollection.rejected, (state, action) => {
        state.userSpecCollection.isLoading = false;
        state.userSpecCollection.collection = action.payload;
      });

    // Fetch Individual Collection
    builder
      .addCase(fetchIndCollection.pending, (state, action) => {
        state.individualCollection.isLoading = true;
      })
      .addCase(fetchIndCollection.fulfilled, (state, action) => {
        state.individualCollection.isLoading = false;
        state.individualCollection.response = action.payload;
      })
      .addCase(fetchIndCollection.rejected, (state, action) => {
        state.individualCollection.isLoading = false;
        state.individualCollection.response = action.payload;
      });

    // Updating Collection
    builder
      .addCase(updateCollection.pending, (state, action) => {
        state.updateCollection.isLoading = true;
      })
      .addCase(updateCollection.fulfilled, (state, action) => {
        state.updateCollection.isLoading = false;
        state.updateCollection.response = action.payload;
      })
      .addCase(updateCollection.rejected, (state, action) => {
        state.updateCollection.isLoading = false;
        state.updateCollection.response = action.payload;
      });

    // Deleting Collection
    builder
      .addCase(deleteCollection.pending, (state, action) => {
        state.deleteCollection.isLoading = true;
      })
      .addCase(deleteCollection.fulfilled, (state, action) => {
        state.deleteCollection.isLoading = false;
        state.deleteCollection.response = action.payload;
      })
      .addCase(deleteCollection.rejected, (state, action) => {
        state.deleteCollection.isLoading = false;
        state.deleteCollection.response = action.payload;
      });
  },
});

export default collectionSlice.reducer;
