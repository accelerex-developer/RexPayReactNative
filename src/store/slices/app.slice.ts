import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Credentials } from "../../model/credentials";
import { AppPayload } from "../../model/payload";
import { CreatePayment, InsertPublicKey } from "../../model/request";
import {
  CreatePaymentResponse,
  PaymentDetails,
  TransactionResponse,
} from "../../model/response";
import { App } from "../../model/state";

export const appInitialState: App = {
  current: 0,
  showSinglePaymentMethod: false,
  credentials: new Credentials(),
  paymentDetails: new PaymentDetails(),
  createPayment: new CreatePayment(),
  createPaymentResponse: new CreatePaymentResponse(),
  encryptedCredential: "",
  showSuccessfulTransactionView: false,
  showFailedTransactionView: false,
  transactionResponse: new TransactionResponse(),
  insertPublickey: new InsertPublicKey(),
};

const appSlice = createSlice({
  name: "app",
  initialState: appInitialState,
  reducers: {
    setAppKey: (state, action: PayloadAction<AppPayload>) => {
      const key: keyof App = action.payload.key;
      state = {
        ...state,
        [key]: action.payload.value,
      };
      return state;
    },
    setAllAppKeys: (state, action: PayloadAction<App>) => {
      state = action.payload as any;
      return state;
    },
  },
});

export const { setAllAppKeys, setAppKey } = appSlice.actions;
export const appReducer = appSlice.reducer;
