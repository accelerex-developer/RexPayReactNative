import React, { useCallback } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";

import SubmitButton from "../../component/SubmitButton";
import { useGetTransactionStatusMutation } from "../../store/api.config";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setAppKey } from "../../store/slices/app.slice";

const AccountDetails = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => {
    return state.bank;
  });
  const [getTransactionStatus, transactionStatusResponse] =
    useGetTransactionStatusMutation();

  const onGetTransactionStatus = useCallback(async () => {
    try {
      const response = await getTransactionStatus(
        state.response?.transactionReference,
      );

      if (response.data?.responseCode === "00") {
        dispatch(
          setAppKey({
            key: "showSuccessfulTransactionView",
            value: true,
          }),
        );
        dispatch(
          setAppKey({
            key: "transactionResponse",
            value: response.data,
          }),
        );
      } else if (response.data?.responseCode === "02") {
        Alert.alert("Transaction Pending", response.data?.responseDescription);
      } else {
        dispatch(
          setAppKey({
            key: "transactionResponse",
            value: response.data,
          }),
        );
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error occurred", "Something went wrong, try again later.");
    }
  }, []);

  return (
    <View style={{ position: "relative", flex: 1 }}>
      <Text style={styles.headerText}>
        Kindly proceed to your banking app mobile/internet to complete your bank
        transfer.
      </Text>
      <Text style={[styles.headerText, { marginTop: 10 }]}>
        Please note the account number expires in 30 minutes.
      </Text>
      <View
        style={{
          backgroundColor: "#70707020",
          paddingVertical: 20,
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 10,
          borderRadius: 10,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Text style={{ color: "#0D2543" }}>Bank:</Text>
          <Text
            style={{
              color: "#0D2543",
              fontWeight: "700",
            }}
          >
            {state.response?.bankName}
          </Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Text style={{ color: "#0D2543" }}>Account Name:</Text>
          <Text
            style={{
              color: "#0D2543",
              fontWeight: "700",
            }}
          >
            {state.response?.accountName}
          </Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Text style={{ color: "#0D2543" }}>Account Number:</Text>
          <Text
            style={{
              color: "#0D2543",
              fontWeight: "700",
            }}
          >
            {state.response?.accountNumber}
          </Text>
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 40,
          width: "100%",
        }}
      >
        <SubmitButton
          loading={transactionStatusResponse.isLoading}
          onPress={onGetTransactionStatus}
        >
          I have completed the transfer
        </SubmitButton>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  headerText: {
    color: "#1A1A1AB8",
    width: "100%",
    lineHeight: 30,
    fontSize: 12,
  },
  pay: {
    marginTop: 10,
  },
});

export default AccountDetails;
