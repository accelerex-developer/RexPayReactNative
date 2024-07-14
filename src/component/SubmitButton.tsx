import React from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

export interface SubmitButtonProps extends TouchableOpacityProps {
  children: any;
  loading?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  children,
  loading,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#ED1C25",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 15,
        borderRadius: 4,
        flexDirection: "row",
      }}
      {...props}
    >
      {loading && (
        <ActivityIndicator
          color="#ffffff"
          style={{
            marginRight: 5,
          }}
        />
      )}
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
