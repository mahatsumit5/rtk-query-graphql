import { api as generatedApi } from "./generated"

export const userApi = generatedApi.enhanceEndpoints({
  addTagTypes: ["Users"],
  endpoints: {
    SignIn: {
      invalidatesTags: ["Users"],
    },
    allPost: {},
  },
})

export const { useSignInMutation, useAllPostQuery } = userApi
