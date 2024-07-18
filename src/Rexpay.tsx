import * as React from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Provider } from "react-redux";

import Footer from "./component/Footer";
import Menu from "./component/Menu";
import TransactionFailed from "./component/TransactionFailed";
import TransactionSuccessful from "./component/TransactionSuccessful";
import useChangePaymentOption from "./hooks/useChangePaymentOption";
import { Credentials } from "./model/credentials";
import { store } from "./store";
import {
  useGetPaymentDetailsQuery,
  useInsertPublicKeyMutation,
} from "./store/api.config";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { setAppKey } from "./store/slices/app.slice";
import { paymentOptions } from "./utils/helper";

const App: React.FC<Credentials> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => {
    return state.app;
  });
  const { onChangePaymentOption } = useChangePaymentOption();
  const [insertPublicKey, insertPublicKeyResponse] =
    useInsertPublicKeyMutation();
  const { data, isLoading, isError, error } = useGetPaymentDetailsQuery(state, {
    skip: !props.reference,
  });

  React.useEffect(() => {
    dispatch(
      setAppKey({
        key: "credentials",
        value: props,
      }),
    );
    dispatch(
      setAppKey({
        key: "paymentDetails",
        value: data,
      }),
    );
  }, [props, data]);

  React.useEffect(() => {
    if (!props.reference && !props.amount && !props.userId) {
      dispatch(
        setAppKey({
          key: "showFailedTransactionView",
          value: true,
        }),
      );
      dispatch(
        setAppKey({
          key: "message",
          value:
            "You need to pass either the transaction reference if transaction was initiated by you or pass the reference, amount and userId if you want the SDK to initiate the transaction",
        }),
      );
    }
  }, []);

  React.useEffect(() => {
    if (isError) {
      dispatch(
        setAppKey({
          key: "showFailedTransactionView",
          value: true,
        }),
      );
      dispatch(
        setAppKey({
          key: "message",
          value: error?.data?.responseMessage ?? error?.error,
        }),
      );
    }
  }, [isError, error, dispatch]);

  React.useEffect(() => {
    const onInsertPublicKey = async () => {
      await insertPublicKey({
        ...state,
        insertPublicKey: {
          clientId: props.username,
          publicKey: props.publicKey,
        },
      });
    };

    onInsertPublicKey();
  }, [props]);

  return (
    <Modal style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Image
        source={{
          uri: "https://res.cloudinary.com/dzmei5g7b/image/upload/v1720515041/rexpay/bg-img_fyb2y3.png",
        }}
        style={styles.image}
      />
      {state.showFailedTransactionView ? (
        <TransactionFailed />
      ) : state.showSuccessfulTransactionView ? (
        <TransactionSuccessful />
      ) : state.showSinglePaymentMethod ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ marginHorizontal: 20 }}>
            <TouchableOpacity onPress={() => onChangePaymentOption(0, false)}>
              <Image
                source={{
                  uri: "https://res.cloudinary.com/dzmei5g7b/image/upload/v1720868944/rexpay/arrow-small-left_3_zcu9rw.png",
                }}
                style={{
                  width: 25,
                  height: 25,
                }}
              />
            </TouchableOpacity>
            <Menu position="horizontal" />
          </View>
          <View style={styles.card}>
            <View style={[styles.textWrapper, { marginBottom: 10 }]}>
              <Text style={styles.amount}>
                {data?.currency ?? "NGN"}{" "}
                {Intl.NumberFormat("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(data?.amount)}
              </Text>
              <Text style={styles.name}>{data?.userId}</Text>
            </View>
            {paymentOptions[state.current].component}
            <Footer />
          </View>
        </View>
      ) : (
        <View style={[{ margin: "auto" }, styles.card]}>
          {isLoading || insertPublicKeyResponse.isLoading ? (
            <ActivityIndicator
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
              }}
            />
          ) : (
            <>
              <View style={styles.textWrapper}>
                <Text style={styles.amount}>
                  {data?.currency ?? "NGN"}{" "}
                  {Intl.NumberFormat("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(data?.amount)}
                </Text>
                <Text style={styles.name}>{data?.userId}</Text>
              </View>
              <View>
                <Text style={styles.description}>
                  Please select your desired payment method to continue.
                </Text>
              </View>
              <Menu position="vertical" />
              <Footer />
            </>
          )}
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

const Rexpay: React.FC<{ config: Credentials }> = ({
  config: {
    mode,
    passPhrase,
    password,
    privateKey,
    publicKey,
    rexpayPublicKey,
    username,
    reference,
  },
}) => {
  return (
    <Provider store={store}>
      <App
        rexpayPublicKey={rexpayPublicKey}
        publicKey={publicKey}
        privateKey={privateKey}
        passPhrase={passPhrase}
        username={username}
        password={password}
        mode={mode}
        reference={reference}
      />
    </Provider>
  );
};

export default Rexpay;
