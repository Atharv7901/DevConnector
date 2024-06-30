import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getPosts: (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    },
    postError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {getPosts, postError} = postSlice.actions;

export default postSlice.reducer;
