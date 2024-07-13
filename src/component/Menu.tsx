import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

import useChangePaymentOption from "../hooks/useChangePaymentOption";
import { paymentOptions } from "../utils/helper";

export interface MenuTypes {
  position: "vertical" | "horizontal";
}

const Menu: React.FC<MenuTypes> = ({ position = "vertical" }) => {
  const { onChangePaymentOption } = useChangePaymentOption();
  const styles = StyleSheet.create({
    row: {
      flexDirection: position === "vertical" ? "row" : "column",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: position === "horizontal" ? 30 : 0,
    },
  });

  return (
    <View
      style={{
        marginVertical: 30,
        gap: 40,
        flexDirection: position === "horizontal" ? "row" : "column",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: position === "horizontal" ? 12 : 0,
      }}
    >
      {paymentOptions.map((item, index) => (
        <TouchableOpacity
          onPress={() => onChangePaymentOption(index)}
          style={styles.row}
          key={index}
        >
          <View
            style={{
              flexDirection: position === "vertical" ? "row" : "column",
              gap: 20,
              alignItems: "center",
            }}
          >
            <Image
              source={{
                uri: item.imgUri,
              }}
              width={25}
              height={25}
            />
            <Text
              style={{
                color: position === "horizontal" ? "#0D2543" : "#1a1a1a",
                fontSize: 14,
                fontWeight: "400",
                marginTop: position === "horizontal" ? -12 : 0,
              }}
            >
              {position === "vertical" ? item.name : item.horizontalName}
            </Text>
          </View>
          {position !== "horizontal" && (
            <Image
              source={{
                uri: "https://res.cloudinary.com/dzmei5g7b/image/upload/v1720537362/rexpay/arrow-right_lhqbyw.png",
              }}
              width={25}
              height={25}
            />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Menu;
