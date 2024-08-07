import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { store } from ".";
import { endpoints } from "./endpoints";
import { App, Bank, USSD } from "../model/state";
import { FormMethod } from "../utils/helper";

type BaseQueryType = ReturnType<typeof fetchBaseQuery>;

export const baseQueryWithReauth: (baseQuery: BaseQueryType) => BaseQueryType =
  (baseQuery) => async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);

    return result;
  };

export const baseQuery = fetchBaseQuery({
  baseUrl: "https://pgs-sandbox.globalaccelerex.com",
});

export const apiConfig = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth(baseQuery),
  tagTypes: ["getData"],
  refetchOnFocus: false,
  refetchOnMountOrArgChange: false,
  endpoints: (builder) => ({
    createPayment: builder.mutation({
      query: (state: App) => {
        return {
          url: endpoints.create_payment,
          method: FormMethod.POST,
          body: state.createPayment,
          headers: {
            Authorization: `Basic ${state.credentials?.base64}`,
          },
        };
      },
    }),
    insertPublicKey: builder.mutation({
      query: (state: App) => {
        return {
          url: endpoints.insert_publickey,
          method: FormMethod.POST,
          body: state.insertPublickey,
          headers: {
            Authorization: `Basic ${state.credentials?.base64}`,
          },
        };
      },
    }),
    getPaymentDetails: builder.query({
      query: (state: App) => {
        return {
          url: endpoints.payment_details + state.credentials.reference,
          headers: {
            Authorization: `Basic ${state.credentials?.base64}`,
          },
        };
      },
    }),
    inititateBankTransfer: builder.mutation({
      query: (state: Bank) => {
        return {
          url: endpoints.charge_by_transfer,
          method: "POST",
          body: state.request,
          headers: {
            Authorization: `Basic ${store.getState().app?.encryptedCredential}`,
          },
        };
      },
    }),
    getTransactionStatus: builder.mutation({
      query: (transactionReference: string) => {
        return {
          url: endpoints.transaction_status,
          method: "POST",
          body: {
            transactionReference,
          },
          headers: {
            Authorization: `Basic ${store.getState().app?.encryptedCredential}`,
          },
        };
      },
    }),
    initiateUssdPayment: builder.mutation({
      query: (state: USSD) => {
        return {
          url: endpoints.charge_by_ussd,
          method: "POST",
          body: state.request,
          headers: {
            Authorization: `Basic ${store.getState().app?.encryptedCredential}`,
          },
        };
      },
    }),
  }),
});

export const {
  useCreatePaymentMutation,
  useGetPaymentDetailsQuery,
  useInititateBankTransferMutation,
  useGetTransactionStatusMutation,
  useInsertPublicKeyMutation,
  useInitiateUssdPaymentMutation,
  useLazyGetPaymentDetailsQuery,
} = apiConfig;
