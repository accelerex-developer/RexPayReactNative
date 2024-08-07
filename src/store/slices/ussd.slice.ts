import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { USSDPayload } from "../../model/payload";
import { USSDPayment } from "../../model/request";
import { USSDPaymentResponse } from "../../model/response";
import { USSD } from "../../model/state";

export const ussdInitialState: USSD = {
  request: new USSDPayment(),
  response: new USSDPaymentResponse(),
};

const ussdSlice = createSlice({
  name: "ussd",
  initialState: ussdInitialState,
  reducers: {
    setUssdKey: (state, action: PayloadAction<USSDPayload>) => {
      const key: keyof USSD = action.payload.key;
      state = {
        ...state,
        [key]: action.payload.value,
      };
      return state;
    },
    setAllUssdKeys: (state, action: PayloadAction<USSDPayload>) => {
      state = action.payload as any;
      return state;
    },
  },
});

export const { setAllUssdKeys, setUssdKey } = ussdSlice.actions;
export const ussdReducer = ussdSlice.reducer;
