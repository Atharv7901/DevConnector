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
  }),
});

export const {useGetAllPostsQuery} = postApi;
