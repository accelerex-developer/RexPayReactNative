import React from "react";
import { View, TextInput, TextInputProps } from "react-native";

interface InputProps extends TextInputProps {
  suffix?: any;
  isError?: boolean;
}

const Input: React.FC<InputProps> = ({ suffix, isError, ...props }) => {
  return (
    <View
      style={{
        borderColor: isError ? "#ff0000" : "#DFDEDE",
        borderWidth: 1,
        padding: 15,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
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
      {suffix}
    </View>
  );
};

export default React.memo(Input);
