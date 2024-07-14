import Bank from "../features/Bank/Bank";
import Card from "../features/Card/Card";
import USSD from "../features/USSD/USSD";
import { store } from "../store";

export enum FormMethod {
  POST = "POST",
  GET = "GET",
}

export const paymentOptions = [
  {
    name: "Pay with Card",
    horizontalName: "Card",
    imgUri:
      "https://res.cloudinary.com/dzmei5g7b/image/upload/v1720515040/rexpay/card_knkey9.png",
    component: <Card />,
  },
  {
    name: "Pay with USSD",
    horizontalName: "USSD",
    imgUri:
      "https://res.cloudinary.com/dzmei5g7b/image/upload/v1720515041/rexpay/ussd_b6huci.png",
    component: <USSD />,
  },
  {
    name: "Pay with Bank",
    horizontalName: "Bank",
    imgUri:
      "https://res.cloudinary.com/dzmei5g7b/image/upload/v1720515040/rexpay/bank_pil8kp.png",
    component: <Bank />,
  },
];

export const getCredentials = () => {
  const state = store.getState();
  const username = state?.app?.credentials?.username;
  const password = state?.app?.credentials?.password;
  if (username && password) {
    return btoa(`${username}:${password}`);
  }
  return null;
};
