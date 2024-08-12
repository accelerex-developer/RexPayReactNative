export type Currency = "NGN";

export type PaymentChannels = "bank" | "card" | "ussd";

export type Mode = "Debug" | "Live";

export interface Response {
  status: string;
  [key: string]: string;
}

export interface SuccessResponse extends Pick<Response, "status"> {
  data?: Record<any, any>;
}

export interface InitializeResponse extends SuccessResponse {
  message: string;
  success: boolean;
  data: { reference: string; authorizeUrl: string };
}

export interface RexPayProps {
  currency?: Currency;
  autoStart?: boolean;
  ref: React.ReactElement;
  activityIndicatorColor?: string;
  onClose: (response: Response) => void;
  onSuccess: (success: SuccessResponse) => void;
  mode?: Mode; //Debug or Live	Debug	Allowed values are Debug or Live.
  reference?: string; // Unique case sensitive transaction identification
  userId: string; //	Email address of customer or any user identification
  amount: string | number; // Amount you want to debit customer e.g 1000.00, 10.00...
  channels?: PaymentChannels[]; // This can be used to conditionally render the channels user wants to see
  metadata?: Record<any, any>; // empty object	false	Object containing any extra information you want recorded with the transaction.
  callbackUrl?: string; // Your current url page	false	CallbackUrl is the url you want your customer to be redirected to when payment is successful. The default url is the page url where customer intialized payment.
}

export interface RexPayRef {
  startTransaction: () => void;
  endTransaction: () => void;
}
