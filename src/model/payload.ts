import { Card, USSD, Bank, App } from "./state";

export class CardPayload {
  key: keyof Card;
  value: any;
  constructor(key: keyof Card, value: any) {
    this.key = key;
    this.value = value;
  }
}
export class BankPayload {
  key: keyof Bank;
  value: any;
  constructor(key: keyof Bank, value: any) {
    this.key = key;
    this.value = value;
  }
}
export class USSDPayload {
  key: keyof USSD;
  value: any;
  constructor(key: keyof USSD, value: any) {
    this.key = key;
    this.value = value;
  }
}
export class AppPayload {
  key: keyof App;
  value: any;
  constructor(key: keyof App, value: any) {
    this.key = key;
    this.value = value;
  }
}
