export class Credentials {
  rexpayPublicKey: string = "";
  publicKey: string = "";
  privateKey: string = "";
  passPhrase: string = "";
  username: string = "";
  password: string = "";
  mode: "TEST" | "STAGING" | "LIVE" = "TEST";
  reference?: string = "";
  amount?: number = 0;
  currency?: string = "";
  userId?: string = "";
  callbackUrl?: string = "";
  metadata?: Metadata = new Metadata();
  base64?: string = "";
  showPaymentPage: boolean = false;
  onClose?: () => void;
}

export class Metadata {
  email: string = "";
  customerName: string = "";
}
