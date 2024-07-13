import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { CardPayload } from "../../model/payload";
import { Card } from "../../model/state";

export const cardInitialState: Card = {
  request: {},
};

const cardSlice = createSlice({
  name: "card",
  initialState: cardInitialState,
  reducers: {
    setCardKey: (state, action: PayloadAction<CardPayload>) => {
      const key: keyof Card = action.payload.key;
      state = {
        ...state,
        [key]: action.payload.value,
      };
      return state;
    },
    setAllCardKeys: (state, action: PayloadAction<CardPayload>) => {
      state = action.payload as any;
      return state;
    },
  },
});

export const { setAllCardKeys, setCardKey } = cardSlice.actions;
export const cardReducer = cardSlice.reducer;
