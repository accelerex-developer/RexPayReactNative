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

<img width="306" alt="Screenshot of library in action" src="https://github.com/user-attachments/assets/3f6db6b2-2274-4046-9f0e-56a79395d78d">

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
| `amount`                             |                                                                                  Amount to be paid                                                                                  |                                                     `nill` |
| `activityIndicatorColor`             |                                                                                   color of loader                                                                                   |                                           default: `green` |
| `userId(required by rexpay)` |                                                                                    Billers userId                                                                                    |                                            default: `nill` |
| `onClose`                           |       callback function if the user cancels or the payment transaction cannot be verified. In a case of not being verified       |                                            default: `nill` |
| `onSuccess`                          |                            callback function if the transaction was successful and verified (it will also return the reference number in the callback )                            |                                            default: `nill` |
| `autoStart`                          |                                                                       Auto start payment once page is opened                                                                        |                                           default: `false` |
| `reference`                          |                                                                 Reference number, if you have already generated one                                                                 | default: `Date.now().toString()` |
| `metadata`                          |                                                                 Extra metadata about the transaction                                                                | default: `{}` |
