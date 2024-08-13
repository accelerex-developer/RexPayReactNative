import { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Rexpay, { type RexPayRef } from 'react-native-rexpay-webview';

export default function App() {
  const ref = useRef<RexPayRef>(null);

  return (
    <View style={style.container}>
      <Rexpay
        ref={ref}
        mode="Debug"
        amount={1000}
        onClose={(_reason) => {}}
        userId="amakirij@gmail.com"
        onSuccess={(_response) => {}}
        metadata={{
          lastName: 'Joseph',
          firstName: 'Amakiri',
          email: 'amakirij@gmail.com',
        }}
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
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '700',
  },
  button: {
    height: 50,
    width: '80%',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ed1c25',
  },
});
