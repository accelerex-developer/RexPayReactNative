import React from "react";
import { View, Text, StyleSheet } from "react-native";

import SubmitButton from "../../component/SubmitButton";

const AccountDetails = () => {
  return (
    <View>
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
            Wema Bank
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
            Ajibola Fasasi
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
            0023456748
          </Text>
        </View>
      </View>
      <SubmitButton>I have completed the transfer</SubmitButton>
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
