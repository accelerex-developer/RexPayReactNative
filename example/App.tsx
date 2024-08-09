import React, { useState } from "react";
import { View, Button } from "react-native";
import { RexPay } from "rexpay-react-native";

const App = () => {
  const [showRexPay, setShowRexPay] = useState(false);

  const paymentProps = {
    reference: Date.now().toString(),
    amount: 100,
    currency: "NGN",
    userId: "test@gmail.com",
    mode: "Debug",
    metadata: {
      email: "test@gmail.com",
      customerName: "Test User",
    },
  };

  const handlePayNow = () => {
    setShowRexPay(true);
  };

  const handleCloseRexPay = () => {
    setShowRexPay(false);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <RexPay
        showPaymentPage={showRexPay}
        paymentProps={paymentProps}
        onClose={handleCloseRexPay}
        onSuccess={(res) => console.log(res)}
      />
      <Button title="Pay now" onPress={handlePayNow} />
    </View>
  );
};

export default App;
