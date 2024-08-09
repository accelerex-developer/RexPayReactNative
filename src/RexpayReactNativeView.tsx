import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { RexpayReactNativeViewProps } from './RexpayReactNative.types';

const NativeView: React.ComponentType<RexpayReactNativeViewProps> =
  requireNativeViewManager('RexpayReactNative');

export default function RexpayReactNativeView(props: RexpayReactNativeViewProps) {
  return <NativeView {...props} />;
}
