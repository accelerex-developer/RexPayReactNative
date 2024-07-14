export class PaymentDetails {
  referenceId: string = "";
  clientId: string = "";
  userId: string = "";
  amount: number = 0;
  fees: number = 0;
  currency: string = "";
  createdAt: string = "";
  channel: string = "";
  paymentInstrument: PaymentInstrument = new PaymentInstrument();
  status: string = "";
  statusMessage: string = "";
  providerReference: string = "";
  bankCode: string = "";
  providerInitiated: boolean = false;
  providerResponse: string = "";
  paymentUrl: string = "";
  clientName: string = "";
  metadata: Metadata = new Metadata();
  timelines: Timeline[] = [];
}

export class PaymentInstrument {
  reference: string = "";
  userId: string = "";
  paymentReference: string = "";
  paymentToken: string = "";
  active: boolean = false;
  instrumentType: string = "";
  reusable: boolean = false;
  createdAt: string = "";
}

export class Metadata {
  customerName: string = "";
  email: string = "";
}

export class Timeline {
  no: number = 0;
  message: string = "";
  time: string = "";
  activity: string = "";
}

export class CreatePaymentResponse {
  reference: string = "";
  clientId: string = "";
  paymentUrl: string = "";
  status: string = "";
  paymentChannel: string = "";
  providerResponse: string = "";
  paymentUrlReference: string = "";
  providerExtraInfo: string = "";
  externalPaymentReference: string = "";
  fees: number = 0;
  currency: string = "";
  currentNumberOfPayment: number = 0;
}

export class BankTransferResponse {
  transactionReference: string = "";
  accountNumber: string = "";
  accountName: string = "";
  bankName: string = "";
  responseCode: string = "";
  responseDescription: string = "";
}

export class TransactionResponse {
  amount: string = "";
  channel: string = "";
  fees: number = 0;
  paymentReference: string = "";
  responseCode: string = "";
  responseDescription: string = "";
  transactionDate: string = "";
}
