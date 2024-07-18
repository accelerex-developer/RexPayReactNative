import { Credentials } from "./credentials";
import {
  BankTransfer,
  CreatePayment,
  InsertPublicKey,
  USSDPayment,
} from "./request";
import {
  BankTransferResponse,
  CreatePaymentResponse,
  PaymentDetails,
  TransactionResponse,
  USSDPaymentResponse,
} from "./response";

export interface Card {
  request: any;
  cardType: string;
}
export interface Bank {
  request: BankTransfer;
  response: BankTransferResponse;
  showAccountDetails: boolean;
}
export interface USSD {
  request: USSDPayment;
  response: USSDPaymentResponse;
}
export interface App {
  current: number;
  showSinglePaymentMethod: boolean;
  credentials: Credentials;
  paymentDetails: PaymentDetails;
  createPayment: CreatePayment;
  createPaymentResponse: CreatePaymentResponse;
  encryptedCredential: string;
  showSuccessfulTransactionView: boolean;
  showFailedTransactionView: boolean;
  transactionResponse: TransactionResponse;
  message?: string;
  insertPublickey: InsertPublicKey;
}
