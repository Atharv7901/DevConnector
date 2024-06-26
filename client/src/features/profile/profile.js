import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
  viewProfile: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    getProfile: (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    },
    profileError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.profile = null;
    },
    updateProfile: (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    },
    clearProfile: (state, action) => {
      state.profile = null;
      state.repos = [];
      state.loading = false;
      state.error = {};
    },
    getProfiles: (state, action) => {
      state.profiles = action.payload;
      state.loading = false;
    },
    getRepos: (state, action) => {
      state.repos = action.payload;
      state.loading = false;
    },
    getViewProfile: (state, action) => {
      state.viewProfile = action.payload;
      state.loading = false;
    },
  },
});

export const {
  getProfile,
  profileError,
  clearProfile,
  updateProfile,
  getProfiles,
  getRepos,
  getViewProfile,
} = profileSlice.actions;

export default profileSlice.reducer;
