import { useCallback } from "react";

import { store } from "../store";
import { setAppKey } from "../store/slices/app.slice";

export interface PaymentOptionsFunction {
  onChangePaymentOption: (
    current: number,
    showSinglePaymentMethod?: boolean,
  ) => void;
}

const useChangePaymentOption = (): PaymentOptionsFunction => {
  const onChangePaymentOption = useCallback(
    (current: number, showSinglePaymentMethod?: boolean) => {
      store.dispatch(
        setAppKey({
          key: "current",
          value: current,
        }),
      );
      store.dispatch(
        setAppKey({
          key: "showSinglePaymentMethod",
          value: showSinglePaymentMethod ?? true,
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
