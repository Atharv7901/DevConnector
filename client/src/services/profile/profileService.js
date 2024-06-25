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

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery,
  endpoints: (builder) => ({
    getLoggedInProfile: builder.query({
      query: (data) => ({
        url: "/profile/me",
        method: "GET",
      }),
    }),
    createProfile: builder.mutation({
      query: (data) => ({
        url: "/profile",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const {useGetLoggedInProfileQuery, useCreateProfileMutation} =
  profileApi;
