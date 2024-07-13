import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Input from "../../component/Input";
import KeyboardAvoidingContainer from "../../component/KeyboardAvoidingContainer";
import SubmitButton from "../../component/SubmitButton";

const Card = () => {
  return (
    <KeyboardAvoidingContainer>
      <View>
        <Text style={styles.headerText}>
          Please, enter your card details to make payment.
        </Text>
        <View style={{ marginVertical: 10 }}>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Input placeholder="Card Number" keyboardType="number-pad" />
          </View>
          <View
            style={{
              flexDirection: "row",
              marginVertical: 20,
              gap: 20,
            }}
          >
            <Input placeholder="Expiry Date" keyboardType="number-pad" />
            <Input placeholder="CVV" keyboardType="number-pad" />
          </View>
          <View
            style={{
              flexDirection: "row",
              marginBottom: 20,
            }}
          >
            <Input placeholder="PIN" keyboardType="number-pad" />
          </View>
          <SubmitButton>Submit</SubmitButton>
        </View>
      </View>
    </KeyboardAvoidingContainer>
  );
};

const styles = StyleSheet.create({
  headerText: {
    color: "#1A1A1AB8",
    width: "80%",
    lineHeight: 30,
  },
});

export default Card;
