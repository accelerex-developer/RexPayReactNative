import { Credentials } from "./credentials";
import { BankTransfer, CreatePayment } from "./request";
import {
  BankTransferResponse,
  CreatePaymentResponse,
  PaymentDetails,
  TransactionResponse,
} from "./response";

export interface Card {
  request: any;
}
export interface Bank {
  request: BankTransfer;
  response: BankTransferResponse;
  showAccountDetails: boolean;
}
export interface USSD {}
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
}
