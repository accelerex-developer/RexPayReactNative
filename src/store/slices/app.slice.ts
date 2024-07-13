import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { AppPayload } from "../../model/payload";
import { App } from "../../model/state";

export const appInitialState: App = {
  current: 0,
  showSinglePaymentMethod: false,
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
    setAllAppKeys: (state, action: PayloadAction<AppPayload>) => {
      state = action.payload as any;
      return state;
    },
  },
});

export const { setAllAppKeys, setAppKey } = appSlice.actions;
export const appReducer = appSlice.reducer;
