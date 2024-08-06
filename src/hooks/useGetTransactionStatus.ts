import { useCallback } from "react";
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
          response?.error?.data?.responseStatus ||
            response?.data?.responseStatus,
          response?.error?.data?.responseMessage ??
            response?.data?.responseMessage ??
            response?.data?.responseDescription,
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

  // useEffect(() => {
  //   if (initiate) {
  //     onGetTransactionStatus();
  //   }

  //   let intervalId: any;

  //   if (
  //     transactionStatusResponse?.data?.responseDescription
  //       ?.toLowerCase()
  //       .includes("in progress")
  //   ) {
  //     intervalId = setInterval(() => {
  //       onGetTransactionStatus();
  //     }, 30000);
  //   }

  //   return () => {
  //     if (intervalId) {
  //       clearInterval(intervalId);
  //     }
  //   };
  // }, [
  //   onGetTransactionStatus,
  //   transactionStatusResponse?.data?.responseDescription,
  // ]);

  return { onGetTransactionStatus, transactionStatusResponse };
};

export default useGetTransactionStatus;
