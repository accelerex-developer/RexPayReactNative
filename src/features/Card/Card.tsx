import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import Input from "../../component/Input";
import SubmitButton from "../../component/SubmitButton";
import useCard from "../../hooks/useCard";
import { useAppSelector } from "../../store/hooks";
import { CardTypes } from "../../utils/helper";

const Card = () => {
  const state = useAppSelector((state) => {
    return state.card;
  });
  const {
    handleExpiryChange,
    handleCardNumberChange,
    handleCvvChange,
    handlePinChange,
    expiryErr,
    expiryDate,
    cardNumber,
    cardNumberErr,
    cvv,
    cvvErr,
    // pin,
    pinErr,
    isButtonDisabled,
  } = useCard();

  return (
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
          <Input
            placeholder="Card Number"
            onChangeText={handleCardNumberChange}
            keyboardType="number-pad"
            isError={!!cardNumberErr}
            value={cardNumber}
            suffix={
              <Image
                source={{
                  uri:
                    state.cardType === CardTypes.MASTERCARD
                      ? "https://res.cloudinary.com/dzmei5g7b/image/upload/v1721298069/rexpay/mastercard_vjgghc_psoqtv.png"
                      : state.cardType === CardTypes.VERVE
                        ? "https://res.cloudinary.com/dzmei5g7b/image/upload/v1721297070/rexpay/verve_kjnu4r.png"
                        : state.cardType === CardTypes.VISA
                          ? "https://res.cloudinary.com/dzmei5g7b/image/upload/v1721297070/rexpay/visa_qoc0q5.png"
                          : undefined,
                }}
                style={
                  state.cardType
                    ? {
                        width: 25,
                        height: 15,
                        objectFit: "contain",
                        marginLeft: -20,
                      }
                    : undefined
                }
              />
            }
          />
        </View>
        {cardNumberErr && (
          <Text
            style={{
              color: "#ff0000",
            }}
          >
            {cardNumberErr}
          </Text>
        )}
        <View
          style={{
            flexDirection: "row",
            marginVertical: 20,
            gap: 20,
          }}
        >
          <Input
            placeholder="Expiry Date"
            keyboardType="number-pad"
            onChangeText={handleExpiryChange}
            isError={!!expiryErr}
            value={expiryDate}
          />
          <Input
            placeholder="CVV"
            keyboardType="number-pad"
            onChangeText={handleCvvChange}
            secureTextEntry
            isError={!!cvvErr}
            value={cvv}
          />
        </View>
        {(expiryErr || cvvErr) && (
          <Text
            style={{
              color: "#ff0000",
              marginTop: -17,
              marginBottom: 10,
            }}
          >
            {expiryErr || cvvErr}
          </Text>
        )}
        <View
          style={{
            flexDirection: "row",
            marginBottom: 20,
          }}
        >
          <Input
            placeholder="PIN"
            keyboardType="number-pad"
            onChangeText={handlePinChange}
            isError={!!pinErr}
            secureTextEntry
            // value={pin}
          />
        </View>
        {pinErr && (
          <Text
            style={{
              color: "#ff0000",
              marginTop: -17,
              marginBottom: 10,
            }}
          >
            {pinErr}
          </Text>
        )}
        <SubmitButton
          disabled={isButtonDisabled}
          style={{
            backgroundColor: isButtonDisabled ? "#F25B61" : "#ED1C25",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 16,
            paddingVertical: 15,
            borderRadius: 4,
            flexDirection: "row",
          }}
        >
          Submit
        </SubmitButton>
      </View>
    </View>
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
