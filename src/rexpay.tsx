import {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  View,
  Modal,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";
import RexpayGatway from "rexpay";
import { WebView, type WebViewNavigation } from "react-native-webview";

import type { InitializeResponse, RexPayProps, RexPayRef } from "./types";
import React from "react";

const rexpay = new RexpayGatway();

export const Rexpay = forwardRef<RexPayRef, RexPayProps>(
  (
    {
      userId,
      amount = 0,
      metadata = {},
      mode = "Debug",
      currency = "NGN",
      autoStart = false,
      onClose: __onClose,
      onSuccess: __onSuccess,
      callbackUrl = "mobile",
      reference = Date.now().toString(),
      activityIndicatorColor = "#ffffff",
    },
    ref
  ) => {
    const webView = useRef<WebView>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [authorizationUrl, setAuthorizationUrl] = useState<string | null>(
      null
    );

    useImperativeHandle(ref, () => ({
      endTransaction: () => setIsModalVisible(false),
      startTransaction: () => setIsModalVisible(true),
    }));

    useEffect(() => {
      // auto start checkout
      autoStart && setIsModalVisible(true);
    }, [autoStart]);

    const onCancel: typeof __onClose = (params) => {
      __onClose(params);
      setIsModalVisible(false);
    };

    const onSuccess: typeof __onSuccess = (params) => {
      __onSuccess(params);
      setIsModalVisible(false);
    };

    const handlePaymentInitiation = async () => {
      try {
        const response: InitializeResponse = await rexpay.initializePayment({
          mode,
          amount,
          userId,
          metadata,
          currency,
          reference,
          callbackUrl,
        });

        if (!response.success || !response.data?.authorizeUrl) {
          throw Error(response.message);
        }

        setAuthorizationUrl(response.data.authorizeUrl);
      } catch (error: any) {
        onCancel({
          status: "Failed",
          message: error.message,
          error: "Payment initiation failed",
        });
      }
    };

    const verifyPayment = async () => {
      try {
        const response = await rexpay.verifyPayment({
          transactionReference: reference,
        });
        onSuccess({ status: "Success", data: response?.data });
      } catch (error: any) {
        onCancel({
          status: "Failed",
          message: error.message,
          error: "Payment verification failed",
        });
      }
    };

    const onNavigationStateChange = (event: WebViewNavigation) => {
      // when page is done loading hide our loader
      if (isLoading && !event.loading && event.title) {
        setIsLoading(event.loading);
      }

      if (event.url?.includes("mobile")) {
        verifyPayment();
      }
    };

    return (
      <Modal
        style={style.modal}
        transparent={false}
        animationType="slide"
        visible={isModalVisible}
        onShow={handlePaymentInitiation}
      >
        <View style={style.modal}>
          <WebView
            ref={webView}
            style={style.modal}
            cacheEnabled={false}
            cacheMode="LOAD_NO_CACHE"
            source={{ uri: authorizationUrl! }}
            onNavigationStateChange={onNavigationStateChange}
          />

          {isLoading && (
            <View style={style.indicator}>
              <Image
                style={StyleSheet.absoluteFill}
                source={require("../assets/bg.png")}
              />
              <ActivityIndicator color={activityIndicatorColor} />
            </View>
          )}
        </View>
      </Modal>
    );
  }
);

const style = StyleSheet.create({
  modal: {
    flex: 1,
  },
  indicator: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    ...StyleSheet.absoluteFillObject,
  },
});
