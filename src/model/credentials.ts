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
}

export class Metadata {
  email: string = "";
  customerName: string = "";
}
