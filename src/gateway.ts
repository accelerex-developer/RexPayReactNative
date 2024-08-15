import type { PaymentProps, Response, RexPayProps } from './types';

const END_POINT: Record<RexPayProps['mode'], string> = {
  Live: 'https://pgs.globalaccelerex.com/api',
  Debug: 'https://pgs-sandbox.globalaccelerex.com/api',
};

export default class RexPay {
  private clientId: string;
  private clientSecret: string;

  constructor(config: Pick<PaymentProps, 'clientId' | 'clientSecret'>) {
    this.clientId = config.clientId;
    this.clientSecret = config.clientSecret;
  }

  public initializePayment(
    data: Omit<
      PaymentProps,
      'transactionReference' | 'clientId' | 'clientSecret'
    >
  ) {
    return this.sendRequest('pgs/payment/v2/createPayment', data);
  }

  public verifyPayment(data: Pick<PaymentProps, 'reference'>) {
    return this.sendRequest('cps/v1/getTransactionStatus', {
      transactionReference: data.reference,
    });
  }

  protected sendRequest = async (
    endpoint: string,
    data: Partial<PaymentProps>
  ) => {
    const url = `${END_POINT[data?.mode || 'Debug']}/${endpoint}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa(`${this.clientId}:${this.clientSecret}`)}`,
        },
      });

      const result: Response = await response.json();
      const isCreated = result.status === 'CREATED';
      const isOk = isCreated || result.responseCode === '00';

      if (!isOk) {
        throw new Error(
          `${result?.responseCode}: ${result?.responseMessage || result?.responseDescription}`
        );
      }

      return {
        success: true,
        message: result.status,
        data: !isCreated
          ? result
          : {
              ...result,
              authorizeUrl: result?.paymentUrl || '',
              reference:
                result?.paymentUrlReference || result?.paymentReference,
            },
      };
    } catch (error: any) {
      return Promise.reject({
        success: false,
        message: error.message ?? 'Service Unavailable. Please try again later',
      });
    }
  };
}
