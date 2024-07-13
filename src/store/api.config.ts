import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQuery, baseQueryWithReauth } from "./baseQueryWithReauth";
import { endpoints } from "./endpoints";
import { Card } from "../model/state";
import { FormMethod } from "../utils/helper";

export const apiConfig = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth(baseQuery),
  tagTypes: ["getData"],
  refetchOnFocus: false,
  refetchOnMountOrArgChange: false,
  endpoints: (builder) => ({
    createPayment: builder.mutation({
      query: (state: Card) => {
        return {
          url: endpoints.create_payment,
          method: FormMethod.POST,
          body: state.request,
        };
      },
    }),
  }),
});

export const { useCreatePaymentMutation } = apiConfig;
