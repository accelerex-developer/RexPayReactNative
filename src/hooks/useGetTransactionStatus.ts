import { useCallback, useEffect } from "react";
import { Alert } from "react-native";

import { useGetTransactionStatusMutation } from "../store/api.config";
import { useAppDispatch } from "../store/hooks";
import { setAppKey } from "../store/slices/app.slice";

const useGetTransactionStatus = (state: any, initiate: boolean = false) => {
  const dispatch = useAppDispatch();
  const [getTransactionStatus, transactionStatusResponse] =
    useGetTransactionStatusMutation();

  const onGetTransactionStatus = useCallback(async () => {
    try {
      const response = await getTransactionStatus(
        state.response?.transactionReference ?? state.response?.reference,
      );

      if (response?.data?.responseCode === "00") {
        dispatch(
          setAppKey({
            key: "showSuccessfulTransactionView",
            value: true,
          }),
        );
        dispatch(
          setAppKey({
            key: "transactionResponse",
            value: response?.data,
          }),
        );
      }
      //   else if (response?.data?.responseCode === "02") {
      //     Alert.alert("Transaction Pending", response?.data?.responseDescription);
      //   }
      else {
        Alert.alert(
          response?.error?.data?.responseStatus,
          response?.error?.data?.responseMessage,
        );
        dispatch(
          setAppKey({
            key: "transactionResponse",
            value: response?.data,
          }),
        );
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error occurred", "Something went wrong, try again later.");
    }
  }, [dispatch, getTransactionStatus, state]);

  useEffect(() => {
    if (initiate) {
      // Execute the function immediately
      onGetTransactionStatus();
    }

    let intervalId: any;

    // Check if the response indicates that a periodic check is needed
    if (
      transactionStatusResponse?.data?.responseDescription
        ?.toLowerCase()
        .includes("in progress")
    ) {
      // Set up an interval to call the function every 30 seconds
      intervalId = setInterval(() => {
        onGetTransactionStatus();
      }, 30000); // 30 seconds
    }

    // Clean up the interval on component unmount
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [
    onGetTransactionStatus,
    transactionStatusResponse?.data?.responseDescription,
  ]);

  // Return the function if you need to call it manually or for testing purposes
  return { onGetTransactionStatus, transactionStatusResponse };
};

export default useGetTransactionStatus;
