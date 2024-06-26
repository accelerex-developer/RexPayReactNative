import { StyleSheet, Text, View } from 'react-native';

import * as RexpayReactNativeSdk from 'rexpay-react-native-sdk';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{RexpayReactNativeSdk.hello()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
