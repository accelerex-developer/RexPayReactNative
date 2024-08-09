import * as React from 'react';

import { RexpayReactNativeViewProps } from './RexpayReactNative.types';

export default function RexpayReactNativeView(props: RexpayReactNativeViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
