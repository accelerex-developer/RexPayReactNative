import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

import AccountDetails from "./AccountDetails";
import SubmitButton from "../../component/SubmitButton";

const Bank = () => {
  const [showAccountDetails, setShowAccountDetails] = useState(false);
  return (
    <View>
      {!showAccountDetails ? (
        <>
          <Text style={styles.headerText}>
            Kindly click the button below to get an account details
          </Text>
          <View style={styles.pay}>
            <SubmitButton onPress={() => setShowAccountDetails(true)}>
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
  },
});
export default Bank;
