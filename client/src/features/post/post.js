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
    getPost: (state, action) => {
      state.post = action.payload;
      state.loading = false;
    },
    postError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateLikes: (state, action) => {
      state.posts = state.posts.map((post) =>
        post._id === action.payload.id
          ? {...state.posts, likes: action.payload.likes}
          : post
      );
      state.loading = false;
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
      state.loading = false;
    },
    addPost: (state, action) => {
      state.posts = [action.payload, ...state.posts];
      state.loading = false;
    },
    addComment: (state, action) => {
      state.post = {...state.post, comments: action.payload};
      state.loading = false;
    },
    removeComment: (state, action) => {
      state.post = {
        ...state.post,
        comments: state.post.comments.filter(
          (comment) => comment._id !== action.payload
        ),
      };
    },
  },
});

export const {
  getPosts,
  postError,
  updateLikes,
  deletePost,
  addPost,
  getPost,
  addComment,
  removeComment,
} = postSlice.actions;

export default postSlice.reducer;
