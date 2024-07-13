import React from "react";

import { App, Bank, Card, USSD } from "../model/state";
import { store } from "../store";
import { appInitialState } from "../store/slices/app.slice";
import { bankInitialState } from "../store/slices/bank.slice";
import { cardInitialState } from "../store/slices/card.slice";
import { ussdInitialState } from "../store/slices/ussd.slice";

interface ReduxStates {
  app: App;
  card: Card;
  bank: Bank;
  ussd: USSD;
}

const initialstate: ReduxStates = {
  app: appInitialState,
  card: cardInitialState,
  bank: bankInitialState,
  ussd: ussdInitialState,
};

const useReduxState = (): ReduxStates => {
  const [state, setState] = React.useState<ReduxStates>(initialstate);

  React.useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const currentState = store.getState();
      setState(currentState);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { ...state };
};

export default useReduxState;
