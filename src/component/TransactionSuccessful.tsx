import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";

const TransactionSuccessful = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={{
            uri: "https://res.cloudinary.com/dzmei5g7b/image/upload/v1720979930/rexpay/Group_5002_yzide2.png",
          }}
          style={{
            width: 80,
            height: 80,
          }}
        />
        <Text
          style={{
            fontWeight: "600",
            fontSize: 22,
            marginTop: 25,
            marginBottom: 15,
          }}
        >
          Payment Successful
        </Text>
        <Text
          style={{ color: "#1a1a1a72", textAlign: "center", lineHeight: 30 }}
        >
          You have made a payment of{" "}
          <Text style={{ fontWeight: "700", color: "#000000" }}>
            NGN 120,000.00.
          </Text>{" "}
          We have sent a receipt to your email.
        </Text>
        <TouchableOpacity>
          <Text style={{ color: "#ED1C25", marginTop: 30 }}>
            Go to Dashboard
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  card: {
    width: Dimensions.get("screen").width - 40,
    height: 350,
    maxHeight: 700,
    backgroundColor: "#ffffff",
    shadowColor: "#00000050",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    position: "relative",
    shadowOpacity: 0.25,
    shadowRadius: 50,
    elevation: 5,
    borderRadius: 4,
    paddingHorizontal: 20,
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TransactionSuccessful;
