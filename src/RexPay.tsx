import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  //   Text,
  //   TouchableOpacity,
  View,
} from "react-native";
import Rexpay from "rexpay";

import RexpayReactNativeView from "./ExpoWebView";

interface PaymentProps {
  reference: string;
  amount: number;
  currency: string;
  userId: string;
  mode: string;
  metadata: {
    email: string;
    customerName: string;
  };
}

const RexPay: React.FC<{
  paymentProps: PaymentProps;
  showPaymentPage: boolean;
  onSuccess: (data: any) => void;
  onClose: () => void;
}> = ({ paymentProps, showPaymentPage, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(true);
  const [authorizationUrl, setAuthorizationUrl] = useState<string>("");

  const handlePaymentInitiation = async () => {
    try {
      const rex = new Rexpay();
      const response = await rex.initializePayment({
        ...paymentProps,
        callbackUrl: "mobile",
      });

      if (response.success && response.data?.authorizeUrl) {
        setAuthorizationUrl(response.data.authorizeUrl);
      } else {
        console.error(
          "Payment initiation failed:",
          response.message || "Unknown error",
        );
      }
    } catch (error) {
      console.error("Error during payment initiation:", error);
    } finally {
      setLoading(false);
    }
  };

  const verifyPayment = () => {
    try {
      const rex = new Rexpay();
      rex
        .verifyPayment({
          transactionReference: paymentProps.reference,
        })
        .then((response) => {
          onSuccess(response?.data);
        });
    } catch (error) {
      //handle error
      console.log(error);
      Alert.alert("Error occured", "Something went wrong, try again later");
    }
  };

  useEffect(() => {
    handlePaymentInitiation();
  }, []);

  const handleNavigationStateChange = (event: any) => {
    if (event.nativeEvent.url?.includes("mobile")) {
      verifyPayment();
      onClose();
    }
  };

  if (!showPaymentPage) {
    return null;
  }

  if (loading && !authorizationUrl) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 99999,
          height: "100%",
          width: "100%",
          backgroundColor: "white",
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <RexpayReactNativeView
      url={authorizationUrl}
      onLoad={() => setLoading(false)}
      onNavigationStateChange={handleNavigationStateChange}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 99999,
        height: "100%",
        width: "100%",
        backgroundColor: "white",
      }}
    />
  );
};

export default RexPay;
