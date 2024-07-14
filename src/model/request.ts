export class CreatePayment {
  reference: string = "";
  amount: number = 0;
  currency: string = "";
  userId: string = "";
  callbackUrl: string = "";
  metadata: Metadata = new Metadata();
}

export class Metadata {
  email: string = "";
  customerName: string = "";
}

export class BankTransfer {
  customerName: string = "";
  reference: string = "";
  amount: number = 0;
  customerId: string = "";
}
