import React from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

export interface SubmitButtonProps extends TouchableOpacityProps {
  children: any;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ children, ...props }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#ED1C25",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 15,
        borderRadius: 4,
      }}
      {...props}
    >
      <Text
        style={{
          color: "white",
          fontWeight: "600",
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default SubmitButton;
