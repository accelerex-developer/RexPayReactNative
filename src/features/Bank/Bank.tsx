import React, { useCallback } from "react";
import { View, Text, StyleSheet, Dimensions, Alert } from "react-native";

import AccountDetails from "./AccountDetails";
import SubmitButton from "../../component/SubmitButton";
import { useInititateBankTransferMutation } from "../../store/api.config";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setBankKey } from "../../store/slices/bank.slice";

const Bank = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => {
    return state.bank;
  });
  const app = useAppSelector((state) => {
    return state.app;
  });
  const [initiateBankTransfer, bankTransferResponse] =
    useInititateBankTransferMutation();

  const onInitiateBankTranfer = useCallback(async () => {
    try {
      const response = await initiateBankTransfer({
        ...state,
        request: {
          customerName: app.paymentDetails?.metadata?.customerName,
          reference: app.paymentDetails?.referenceId,
          amount: app?.paymentDetails?.amount,
          customerId: app?.paymentDetails?.userId,
        },
      });
      if (response.data) {
        dispatch(
          setBankKey({
            key: "showAccountDetails",
            value: true,
          }),
        );
        dispatch(
          setBankKey({
            key: "response",
            value: response?.data,
          }),
        );
      } else {
        Alert.alert(
          "Error occurred",
          response?.error?.responseDescription ??
            response?.error?.data?.responseMessage ??
            response?.data?.responseDescription,
        );
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error occurred", "Something went wrong, try again later.");
    }
  }, [dispatch, state]);

  return (
    <View style={{ position: "relative", flex: 1 }}>
      {!state.showAccountDetails ? (
        <>
          <Text style={styles.headerText}>
            Kindly click the button below to get an account details
          </Text>
          <View style={styles.pay}>
            <SubmitButton
              loading={bankTransferResponse.isLoading}
              onPress={onInitiateBankTranfer}
            >
              Pay
            </SubmitButton>
          </View>
        </>
      ) : (
        <AccountDetails />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  headerText: {
    color: "#1A1A1AB8",
    width: Dimensions.get("screen").width > 400 ? "80%" : "100%",
    lineHeight: 30,
  },
  pay: {
    marginTop: 10,
    position: "absolute",
    bottom: 40,
    width: "100%",
  },
});
export default Bank;
