import { useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Rexpay, { RexPayRef } from "./src";

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
