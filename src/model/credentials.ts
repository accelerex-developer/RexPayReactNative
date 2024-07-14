export class Credentials {
  rexpayPublicKey: string = "";
  publicKey: string = "";
  privateKey: string = "";
  passPhrase: string = "";
  username: string = "";
  password: string = "";
  mode: "TEST" | "STAGING" | "LIVE" = "TEST";
  reference?: string = "";
}
