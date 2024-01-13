import { createSlice } from "@reduxjs/toolkit";
import { fetchUserProfile } from "./profileAction";
import { createProfile } from "./profileAction";
import { followUser } from "./profileAction";

const profileSlice = createSlice({
  name: "Profile",
  initialState: {
    userProfile: {
      isLoading: false,
      response: null,
    },
    createProfileData: {
      isLoading: false,
      response: null,
    },
    followUserData: {
      isLoading: false,
      response: null
    }
  },
  extraReducers: (builder) => {
    // Fetch User Profile
    builder
      .addCase(fetchUserProfile.pending, (state, action) => {
        state.userProfile.isLoading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.userProfile.isLoading = false;
        state.userProfile.response = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.userProfile.isLoading = false;
        state.userProfile.response = action.payload;
      });

    // Create User Profile
    builder
      .addCase(createProfile.pending, (state, action) => {
        state.createProfileData.isLoading = true;
      })
      .addCase(createProfile.fulfilled, (state, action) => {
        state.createProfileData.isLoading = false;
        state.createProfileData.response = action.payload;
      })
      .addCase(createProfile.rejected, (state, action) => {
        state.createProfileData.isLoading = false;
        state.createProfileData.response = action.payload;
      });

    // Follow User
    builder
      .addCase(followUser.pending, (state, action) => {
        state.followUserData.isLoading = true;
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.followUserData.isLoading = false;
        state.followUserData.response = action.payload;
      })
      .addCase(followUser.rejected, (state, action) => {
        state.followUserData.isLoading = false;
        state.followUserData.response = action.payload;
      });
  },
});

export default profileSlice.reducer;
