import * as React from "react";
import { Dimensions, Image, Modal, StyleSheet, Text, View } from "react-native";

import Footer from "./component/Footer";
import Menu from "./component/Menu";
import useReduxState from "./hooks/useReduxState";
import { paymentOptions } from "./utils/helper";

const Rexpay = () => {
  const { app } = useReduxState();

  return (
    <Modal style={styles.container}>
      <Image
        source={{
          uri: "https://res.cloudinary.com/dzmei5g7b/image/upload/v1720515041/rexpay/bg-img_fyb2y3.png",
        }}
        style={styles.image}
      />
      {app.showSinglePaymentMethod ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ marginHorizontal: 20 }}>
            <Menu position="horizontal" />
          </View>
          <View style={styles.card}>
            <View style={[styles.textWrapper, { marginBottom: 10 }]}>
              <Text style={styles.amount}>NGN 120,000</Text>
              <Text style={styles.name}>example@gmail.com</Text>
            </View>
            {paymentOptions[app.current].component}
            <Footer />
          </View>
        </View>
      ) : (
        <View style={[{ margin: "auto" }, styles.card]}>
          <View style={styles.textWrapper}>
            <Text style={styles.amount}>NGN 120,000</Text>
            <Text style={styles.name}>example@gmail.com</Text>
          </View>
          <View>
            <Text style={styles.description}>
              Please select your desired payment method to continue.
            </Text>
          </View>
          <Menu position="vertical" />
          <Footer />
        </View>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
  },
  card: {
    width: Dimensions.get("screen").width - 40,
    height: 500,
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
  },
  amount: {
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "br-bold",
    color: "#1A1A1A",
  },
  name: {
    color: "#9c9898",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 18,
    marginTop: 10,
  },
  textWrapper: {
    borderBottomColor: "#EDEDED",
    borderBottomWidth: 0.7,
    paddingVertical: 10,
  },
  description: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 24,
    textAlign: "left",
    color: "#1A1A1AB8",
    marginTop: 20,
    width: "90%",
  },
});

export default Rexpay;
