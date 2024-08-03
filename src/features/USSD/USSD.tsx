import React, { useCallback, useEffect, useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";

import SubmitButton from "../../component/SubmitButton";
import useGetTransactionStatus from "../../hooks/useGetTransactionStatus";
import { useInitiateUssdPaymentMutation } from "../../store/api.config";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setUssdKey } from "../../store/slices/ussd.slice";

const USSD = () => {
  const dispatch = useAppDispatch();
  const [shouldInitiate, setShouldInitiate] = useState(false);
  const [showUssdCode, setSetshowUssdCode] = useState(false);
  const state = useAppSelector((state) => {
    return state.ussd;
  });
  const app = useAppSelector((state) => {
    return state.app;
  });
  const [bankName, setBankName] = useState("");
  const [ussdPayment, ussdPaymentResponse] = useInitiateUssdPaymentMutation();

  const onUssdPayment = useCallback(async () => {
    try {
      const response = await ussdPayment({
        ...state,
        request: {
          reference: app.paymentDetails?.referenceId,
          userId: app.paymentDetails?.userId,
          amount: app.paymentDetails?.amount,
          currency: app.paymentDetails?.currency,
          callbackUrl: app.paymentDetails?.callbackUrl,
          paymentChannel: "USSD",
        },
      });

      if (
        response.error ||
        (response?.data?.responseCode && response?.data?.responseCode !== "00")
      ) {
        Alert.alert(
          "Error occurred",
          response.error?.data?.responseMessage ??
            response?.data?.responseMessage ??
            "Something went wrong",
        );
      } else {
        setSetshowUssdCode(true);
        dispatch(
          setUssdKey({
            key: "response",
            value: response.data,
          }),
        );
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error occurred", "Something went wrong, try again later.");
    }
  }, []);

  const { transactionStatusResponse } = useGetTransactionStatus(
    state,
    shouldInitiate,
  );
  // console.log(transactionStatusResponse);

  useEffect(() => {
    if (ussdPaymentResponse.isSuccess) {
      setShouldInitiate(true);
    }
  }, [ussdPaymentResponse.isSuccess]);

  return (
    <View
      style={{
        flex: 1,
        marginBottom: 30,
      }}
    >
      <Text
        style={{
          color: "#1A1A1AB8",
          fontSize: 14,
          textAlign: "center",
          marginTop: 10,
        }}
      >
        Please, choose a bank to continue with payment
      </Text>
      <View
        style={{
          marginVertical: 20,
          flex: 1,
        }}
      >
        <RNPickerSelect
          onValueChange={(value) => setBankName(value)}
          placeholder={{
            label: "Select bank",
            value: "",
            inputLabel: "Select bank",
          }}
          items={[
            { label: "Access Bank", value: "Access bank" },
            { label: "Ecobank", value: "ecobank" },
            { label: "Fidelity bank", value: "fidelity bank" },
            { label: "First bank", value: "first bank" },
            { label: "FCMB", value: "FCMB" },
            { label: "GTBank", value: "GTBank" },
          ]}
          Icon={() => (
            <Image
              source={{
                uri: "https://res.cloudinary.com/dzmei5g7b/image/upload/v1721070630/rexpay/Group_14_uivkk7.png",
              }}
              style={{
                width: 25,
                height: 25,
                marginTop: -4,
              }}
            />
          )}
          style={{
            viewContainer: {
              borderWidth: 1,
              borderColor: "#DFDEDE",
              padding: 15,
            },
          }}
        />
        {showUssdCode && (
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
              <Text style={{ color: "#0D2543" }}>
                Dial the below code to complete payment
              </Text>
              <Text
                style={{
                  color: "#0D2543",
                  fontWeight: "700",
                }}
              >
                {state.response?.providerResponse}
              </Text>
            </View>
          </View>
        )}
      </View>
      <SubmitButton
        disabled={
          !bankName ||
          ussdPaymentResponse.isLoading ||
          transactionStatusResponse?.isLoading
        }
        style={{
          backgroundColor:
            !bankName ||
            ussdPaymentResponse.isLoading ||
            transactionStatusResponse?.isLoading
              ? "#F25B61"
              : "#ED1C25",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingVertical: 15,
          borderRadius: 4,
          flexDirection: "row",
        }}
        onPress={onUssdPayment}
        loading={
          ussdPaymentResponse.isLoading || transactionStatusResponse?.isLoading
        }
      >
        Proceed
      </SubmitButton>
    </View>
  );
};

export default USSD;
