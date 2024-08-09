import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to RexpayReactNative.web.ts
// and on native platforms to RexpayReactNative.ts
import RexpayReactNativeModule from './RexpayReactNativeModule';
import RexpayReactNativeView from './RexpayReactNativeView';
import { ChangeEventPayload, RexpayReactNativeViewProps } from './RexpayReactNative.types';

// Get the native constant value.
export const PI = RexpayReactNativeModule.PI;

export function hello(): string {
  return RexpayReactNativeModule.hello();
}

export async function setValueAsync(value: string) {
  return await RexpayReactNativeModule.setValueAsync(value);
}

const emitter = new EventEmitter(RexpayReactNativeModule ?? NativeModulesProxy.RexpayReactNative);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { RexpayReactNativeView, RexpayReactNativeViewProps, ChangeEventPayload };
