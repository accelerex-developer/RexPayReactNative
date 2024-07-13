import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";

import { apiConfig } from "./api.config";
import { appReducer } from "./slices/app.slice";
import { bankReducer } from "./slices/bank.slice";
import { cardReducer } from "./slices/card.slice";
import { ussdReducer } from "./slices/ussd.slice";

const reducer = combineReducers({
  card: cardReducer,
  bank: bankReducer,
  ussd: ussdReducer,
  app: appReducer,
  [apiConfig.reducerPath]: apiConfig.reducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(apiConfig.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
