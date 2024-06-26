import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerSuccess: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
    },
    userLoaded: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
      state.token = localStorage.getItem("token");
    },
    loginSuccess: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
    },
    registerFail: (state, action) => {
      localStorage.removeItem("token");
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
    },
    loginFail: (state, action) => {
      localStorage.removeItem("token");
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
    },
    logout: (state, action) => {
      localStorage.removeItem("token");
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
    },
  },
});

export const {
  registerSuccess,
  registerFail,
  userLoaded,
  loginSuccess,
  loginFail,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
