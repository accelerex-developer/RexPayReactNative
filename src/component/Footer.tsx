import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={{ color: "#1A1A1AB8", marginRight: 10 }}>Powered By: </Text>
      <Image
        source={{
          uri: "https://res.cloudinary.com/dzmei5g7b/image/upload/v1720518261/rexpay/ga_ebxrok.png",
        }}
        width={70}
        height={20}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 15,
    left: 50,
    transform: [{ translateX: 50 }],
  },
});
export default Footer;
