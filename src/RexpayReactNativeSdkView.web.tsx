import * as React from 'react';

import { RexpayReactNativeSdkViewProps } from './RexpayReactNativeSdk.types';

export default function RexpayReactNativeSdkView(props: RexpayReactNativeSdkViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
