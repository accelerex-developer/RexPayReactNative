import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to RexpayReactNativeSdk.web.ts
// and on native platforms to RexpayReactNativeSdk.ts
import RexpayReactNativeSdkModule from './RexpayReactNativeSdkModule';
import RexpayReactNativeSdkView from './RexpayReactNativeSdkView';
import { ChangeEventPayload, RexpayReactNativeSdkViewProps } from './RexpayReactNativeSdk.types';

// Get the native constant value.
export const PI = RexpayReactNativeSdkModule.PI;

export function hello(): string {
  return RexpayReactNativeSdkModule.hello();
}

export async function setValueAsync(value: string) {
  return await RexpayReactNativeSdkModule.setValueAsync(value);
}

const emitter = new EventEmitter(RexpayReactNativeSdkModule ?? NativeModulesProxy.RexpayReactNativeSdk);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { RexpayReactNativeSdkView, RexpayReactNativeSdkViewProps, ChangeEventPayload };
