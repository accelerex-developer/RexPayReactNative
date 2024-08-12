# React Native Rexpay WebView

The package allows you accept payment using rexpay, install, add keys and use. No stress :)

### [](https://github.com/josemak25/react-native-rexpay-webview)Installation

Add React-Native-Rexpay-WebView to your project by running;

`npm install react-native-rexpay-webview`

or

`yarn add react-native-rexpay-webview`

### **One more thing**

To frontload the installation work, let's also install and configure dependencies used by this project, being **react-native-webview**

run

`yarn add react-native-webview`

for iOS: `cd iOS && pod install && cd ..`

for expo applications run;

`expo install react-native-webview`

and that's it, you're all good to go!

<img width="306" alt="Screenshot of library in action" src="https://user-images.githubusercontent.com/41248079/126550307-5f12c6d8-81af-4f26-951b-5d6514304022.png">

### [](https://github.com/user-attachments/assets/3f6db6b2-2274-4046-9f0e-56a79395d78d)Usage 1

```javascript
import React from "react";
import { Paystack } from "react-native-rexpay-webview";
import { View } from "react-native";

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Rexpay
        amount={250}
        userId="test@gmail.com"
        onClose={(e) => {
          // handle response here
        }}
        onSuccess={(res) => {
          // handle response here
        }}
        autoStart={true}
      />
    </View>
  );
}
```

## Usage 2 - Using Refs

Make use of a `ref` to start transaction. See example below;

```typescript
import { useRef } from "react";
import Rexpay, { type RexPayRef } from "react-native-rexpay-webview";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function App() {
  const ref = useRef<RexPayRef>(null);

  return (
    <View style={style.container}>
      <Rexpay
        ref={ref}
        amount={100}
        userId="test@gmail.com"
        onClose={(reason) => {}}
        onSuccess={(response) => {}}
      />

      <TouchableOpacity
        style={style.button}
        onPress={() => ref?.current?.startTransaction()}
      >
        <Text style={style.buttonText}>Pay with Rexpay</Text>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "700",
  },
  button: {
    height: 50,
    width: "80%",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ed1c25",
  },
});
```

## API's

| Name                                 |                                                                                   use/description                                                                                   |                                                      extra |
| :----------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | ---------------------------------------------------------: |
| `paystackKey`                        |                                                           Public or Private paystack key(visit paystack.com to get yours)                                                           |                                                     `nill` |
| `amount`                             |                                                                                  Amount to be paid                                                                                  |                                                     `nill` |
| `activityIndicatorColor`             |                                                                                   color of loader                                                                                   |                                           default: `green` |
| `billingEmail(required by paystack)` |                                                                                    Billers email                                                                                    |                                            default: `nill` |
| `billingMobile`                      |                                                                                   Billers mobile                                                                                    |                                            default: `nill` |
| `billingName`                        |                                                                                    Billers Name                                                                                     |                                            default: `nill` |
| `subaccount`                         |    Specify subaccount code generated from the Paystack Dashboard or API to enable Split Payment on the transaction. Here's an example of usage: `subaccount: "SUB_ACCOUNTCODE"`     |                                            default: `nill` |
| `channels`                           | Specify payment options available to users. Available channel options are: ["card", "bank", "ussd", "qr", "mobile_money"]. Here's an example of usage: `channels={["card","ussd"]}` |                                        default: `["card"]` |
| `onCancel`                           |       callback function if user cancels or payment transaction could not be verified. In a case of not being verified, transactionRef number is also returned in the callback       |                                            default: `nill` |
| `onSuccess`                          |                            callback function if transaction was successful and verified (it will also return the transactionRef number in the callback )                            |                                            default: `nill` |
| `autoStart`                          |                                                                       Auto start payment once page is opened                                                                        |                                           default: `false` |
| `refNumber`                          |                                                                 Reference number, if you have already generated one                                                                 | default: `''+Math.floor((Math.random() * 1000000000) + 1)` |
| `handleWebViewMessage`               |                                                                  Will be called when a WebView receives a message                                                                   |                                            default: `true` |
