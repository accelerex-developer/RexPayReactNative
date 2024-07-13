import { useCallback } from "react";

import { store } from "../store";
import { setAppKey } from "../store/slices/app.slice";

export interface PaymentOptionsFunction {
  onChangePaymentOption: (current: number) => void;
}

const useChangePaymentOption = (): PaymentOptionsFunction => {
  const onChangePaymentOption = useCallback(
    (current: number) => {
      store.dispatch(
        setAppKey({
          key: "current",
          value: current,
        }),
      );
      store.dispatch(
        setAppKey({
          key: "showSinglePaymentMethod",
          value: true,
        }),
      );
    },
    [store.dispatch],
  );

  return {
    onChangePaymentOption,
  };
};

export default useChangePaymentOption;
