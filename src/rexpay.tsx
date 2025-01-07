import {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  View,
  Modal,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { WebView, type WebViewNavigation } from 'react-native-webview';
import RexPayGateway from './gateway';

import type { RexPayProps, RexPayRef } from './types';

export const Rexpay = forwardRef<RexPayRef, RexPayProps>(
  (
    {
      clientId,
      amount = 0,
      clientSecret,
      metadata = {},
      mode = 'Debug',
      currency = 'NGN',
      autoStart = false,
      onClose: __onClose,
      onSuccess: __onSuccess,
      callbackUrl = 'mobile',
      reference = Date.now().toString(),
      activityIndicatorColor = '#ffffff',
      ...restPaymentProps
    },
    ref
  ) => {
    const webView = useRef<WebView>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [authorizationUrl, setAuthorizationUrl] = useState<string | null>(
      null
    );

    useImperativeHandle(ref, () => ({
      endTransaction: () => setIsModalVisible(false),
      startTransaction: () => setIsModalVisible(true),
    }));

    useEffect(() => {
      // auto start checkout
      autoStart && setIsModalVisible(true);
    }, [autoStart]);

    const onCancel: typeof __onClose = (params) => {
      __onClose(params);
      setIsModalVisible(false);
    };

    const onSuccess: typeof __onSuccess = (params) => {
      __onSuccess(params);
      setIsModalVisible(false);
    };

    const handlePaymentInitiation = async () => {
      try {
        const rexpay = new RexPayGateway({ clientId, clientSecret });
        const response = await rexpay.initializePayment({
          mode,
          amount,
          metadata,
          currency,
          reference,
          callbackUrl,
          ...restPaymentProps,
        });

        if (!response.success) {
          throw Error(response.message);
        }

        setAuthorizationUrl(response.data.authorizeUrl);
      } catch (error: any) {
        onCancel({
          status: 'Failed',
          message: error.message,
          error: 'Payment initiation failed',
        });
      }
    };

    const verifyPayment = async () => {
      try {
        const rexpay = new RexPayGateway({ clientId, clientSecret });
        const response = await rexpay.verifyPayment({ reference });
        onSuccess({ status: 'Success', data: response?.data });
      } catch (error: any) {
        onCancel({
          status: 'Failed',
          message: error.message,
          error: 'Payment verification failed',
        });
      }
    };

    const onNavigationStateChange = (event: WebViewNavigation) => {
      // when page is done loading hide our loader
      if (isLoading && !event.loading && event.title) {
        setIsLoading(event.loading);
      }

      if (event.url?.includes('mobile')) {
        verifyPayment();
      }
    };

    return (
      <Modal
        style={style.modal}
        transparent={false}
        animationType="slide"
        visible={isModalVisible}
        onShow={handlePaymentInitiation}
      >
        <View style={style.modal}>
          <WebView
            ref={webView}
            style={style.modal}
            cacheEnabled={false}
            scrollEnabled={false}
            cacheMode="LOAD_NO_CACHE"
            onNavigationStateChange={onNavigationStateChange}
            source={authorizationUrl ? { uri: authorizationUrl } : undefined}
          />

          {isLoading && (
            <View style={style.indicator}>
              <Image
                style={StyleSheet.absoluteFill}
                source={require('./assets/bg.png')}
              />
              <ActivityIndicator color={activityIndicatorColor} />
            </View>
          )}
        </View>
      </Modal>
    );
  }
);

const style = StyleSheet.create({
  modal: {
    flex: 1,
  },
  indicator: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    ...StyleSheet.absoluteFillObject,
  },
});
