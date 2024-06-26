import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { RexpayReactNativeSdkViewProps } from './RexpayReactNativeSdk.types';

const NativeView: React.ComponentType<RexpayReactNativeSdkViewProps> =
  requireNativeViewManager('RexpayReactNativeSdk');

export default function RexpayReactNativeSdkView(props: RexpayReactNativeSdkViewProps) {
  return <NativeView {...props} />;
}
