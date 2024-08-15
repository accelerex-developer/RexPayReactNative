import { useRef } from 'react';
import Rexpay, { type RexPayRef } from 'react-native-rexpay-webview';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const DEFAULT_CLIENT = 'talk2phasahsyyahoocom';
const DEFAULT_SECRET =
  'f0bedbea93df09264a4f09a6b38de6e9b924b6cb92bf4a0c07ce46f26f85';

export default function App() {
  const ref = useRef<RexPayRef>(null);

  return (
    <View style={style.container}>
      <Rexpay
        ref={ref}
        mode="Debug"
        amount={1000}
        clientId={DEFAULT_CLIENT}
        onClose={(_reason) => {}}
        userId="amakirij@gmail.com"
        clientSecret={DEFAULT_SECRET}
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
