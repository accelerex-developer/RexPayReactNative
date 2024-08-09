import { requireNativeViewManager } from "expo-modules-core";
import * as React from "react";
import { ViewProps } from "react-native";

export type OnLoadEvent = {
  url: string;
};

export type Props = {
  url?: string;
  onLoad?: (event: { nativeEvent: OnLoadEvent }) => void;
  onNavigationStateChange?: (event: { nativeEvent: any }) => void;
} & ViewProps;

const NativeView: React.ComponentType<Props> = requireNativeViewManager(
  "RexpayReactNativeView",
);

export default function RexpayReactNativeView(props: Props) {
  return <NativeView {...props} />;
}
