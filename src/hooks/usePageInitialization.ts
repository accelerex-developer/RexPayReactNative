import { isEqual } from "lodash";
import React from "react";
import { Alert } from "react-native";

import useChangePaymentOption from "./useChangePaymentOption";
import { Credentials } from "../model/credentials";
import { App } from "../model/state";
import {
  useInsertPublicKeyMutation,
  useLazyGetPaymentDetailsQuery,
  useCreatePaymentMutation,
} from "../store/api.config";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setAllAppKeys, setAppKey } from "../store/slices/app.slice";
import { generateAuthKey } from "../utils/helper";

interface PageInitializationFunction {
  onChangePaymentOption: (
    current: number,
    showSinglePaymentMethod?: boolean | undefined,
  ) => void;
  insertPublicKeyResponse: any;
  createPaymentResponse: any;
  isLoading: boolean;
  state: App;
  data: any;
}

const usePageInitialization = (
  props: Credentials,
): PageInitializationFunction => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => {
    return state.app;
  });
  const { onChangePaymentOption } = useChangePaymentOption();
  const [insertPublicKey, insertPublicKeyResponse] =
    useInsertPublicKeyMutation();
  const [getPaymentDetails, { data, isLoading, isError, error }] =
    useLazyGetPaymentDetailsQuery();
  const [createPayment, createPaymentResponse] = useCreatePaymentMutation();
  const base64 = generateAuthKey(props.username, props.password);

  React.useLayoutEffect(() => {
    const newState = {
      ...state,
      encryptedCredential: base64,
      credentials: {
        ...props,
        base64,
      },
      paymentDetails: data,
      createPayment: {
        reference: props.reference,
        amount: props.amount,
        currency: props.currency ?? "NGN",
        userId: props.userId,
        callbackUrl: props.callbackUrl,
        metadata: props.metadata,
      },
      insertPublickey: {
        clientId: props.username,
        publicKey: props.publicKey,
      },
    };

    if (!isEqual(state, newState)) {
      dispatch(setAllAppKeys(newState));
    }
  }, [dispatch, props, data, base64, state]);

  const onCreatePayment = React.useCallback(async () => {
    if (state.credentials?.base64) {
      try {
        const response = await createPayment(state);
        if (response.data?.paymentUrl) {
          await getPaymentDetails(state);
        } else {
          Alert.alert("Error occured", response.error?.data?.responseMessage);
        }
      } catch (error) {
        console.log(error);
        Alert.alert("Error occured", "Something went wrong try again later.");
      }
    }
  }, [props.reference, props.amount, props.userId, state]);

  React.useEffect(() => {
    const startPayment = async () => {
      if (props.amount && props.reference && props.userId) {
        await onCreatePayment();
      } else if (props.reference) {
        await getPaymentDetails(state);
      }
    };

    startPayment();
  }, [props.amount, props.reference, props.userId, onCreatePayment]);

  React.useEffect(() => {
    if (isError) {
      dispatch(
        setAppKey({
          key: "showFailedTransactionView",
          value: true,
        }),
      );
      dispatch(
        setAppKey({
          key: "message",
          value: error?.data?.responseMessage ?? error?.error,
        }),
      );
    }
  }, [isError, error, dispatch]);

  React.useEffect(() => {
    if (state.credentials?.base64) {
      const onInsertPublicKey = async () => {
        await insertPublicKey(state);
      };

      onInsertPublicKey();
    }
  }, [props, state.credentials?.base64]);

  return {
    onChangePaymentOption,
    insertPublicKeyResponse,
    createPaymentResponse,
    isLoading,
    state,
    data,
  };
};

export default usePageInitialization;
