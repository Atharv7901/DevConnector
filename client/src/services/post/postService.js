import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BaseURL} from "../auth/baseURL";

const baseQuery = fetchBaseQuery({
  baseUrl: `${BaseURL}`,
  prepareHeaders: (headers, {getState}) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("x-auth-token", token);
    }
    return headers;
  },
});

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery,
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: (data) => ({
        url: "/posts",
        method: "GET",
      }),
    }),
    addLike: builder.mutation({
      query: (data) => ({
        url: `/posts/like/${data.postID}`,
        method: "PUT",
        body: data,
      }),
    }),
    removeLikes: builder.mutation({
      query: (data) => ({
        url: `/posts/unlike/${data.postID}`,
        method: "PUT",
        body: data,
      }),
    }),
    deletePost: builder.mutation({
      query: (data) => ({
        url: `/posts/${data.id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useAddLikeMutation,
  useRemoveLikesMutation,
  useDeletePostMutation,
} = postApi;
