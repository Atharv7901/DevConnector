import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
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
  },
});

export const {
  getProfile,
  profileError,
  clearProfile,
  updateProfile,
  getProfiles,
  getRepos,
} = profileSlice.actions;

export default profileSlice.reducer;
