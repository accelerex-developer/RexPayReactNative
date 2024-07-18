import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { store } from ".";
import { endpoints } from "./endpoints";
import { setAppKey } from "./slices/app.slice";
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
        const username = state?.credentials?.username;
        const password = state?.credentials?.password;
        const credentials = btoa(`${username}:${password}`);
        return {
          url: endpoints.create_payment,
          method: FormMethod.POST,
          body: state.createPayment,
          headers: {
            Authorization: `Basic ${credentials}`,
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
            Authorization: `Basic ${store.getState().app?.encryptedCredential}`,
          },
        };
      },
    }),
    getPaymentDetails: builder.query({
      query: (state: App) => {
        const username = state?.credentials?.username;
        const password = state?.credentials?.password;
        const credentials = btoa(`${username}:${password}`);
        store.dispatch(
          setAppKey({
            key: "encryptedCredential",
            value: credentials,
          }),
        );
        return {
          url: endpoints.payment_details + state.credentials.reference,
          headers: {
            Authorization: `Basic ${credentials}`,
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
} = apiConfig;
