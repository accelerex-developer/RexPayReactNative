import React from "react";
import { View, TextInput, TextInputProps } from "react-native";

const Input: React.FC<TextInputProps> = ({ ...props }) => {
  return (
    <View
      style={{
        borderColor: "#DFDEDE",
        borderWidth: 1,
        padding: 15,
        flex: 1,
      }}
    >
      <TextInput
        placeholderTextColor="#9C9898"
        style={{
          width: "100%",
          //   color: "#9C9898",
        }}
        {...props}
      />
    </View>
  );
};

export default React.memo(Input);
