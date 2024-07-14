import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { BankPayload } from "../../model/payload";
import { BankTransfer } from "../../model/request";
import { BankTransferResponse } from "../../model/response";
import { Bank } from "../../model/state";

export const bankInitialState: Bank = {
  request: new BankTransfer(),
  response: new BankTransferResponse(),
  showAccountDetails: false,
};

const bankSlice = createSlice({
  name: "bank",
  initialState: bankInitialState,
  reducers: {
    setBankKey: (state, action: PayloadAction<BankPayload>) => {
      const key: keyof Bank = action.payload.key;
      state = {
        ...state,
        [key]: action.payload.value,
      };
      return state;
    },
    setAllBankKeys: (state, action: PayloadAction<BankPayload>) => {
      state = action.payload as any;
      return state;
    },
  },
});

export const { setAllBankKeys, setBankKey } = bankSlice.actions;
export const bankReducer = bankSlice.reducer;
