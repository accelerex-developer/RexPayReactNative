import React, { useState } from "react";
import { View, StyleSheet } from "react-native";


const USSD = () => {
  const [selectedValue, setSelectedValue] = useState("java");

  return (
    <View>
       
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: 200,
  },
});

export default USSD;
