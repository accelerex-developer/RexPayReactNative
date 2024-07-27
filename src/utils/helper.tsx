import Bank from "../features/Bank/Bank";
import Card from "../features/Card/Card";
import USSD from "../features/USSD/USSD";

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

export const generateAuthKey = (username: string, password: string) => {
  const credentials = btoa(`${username}:${password}`);
  return credentials;
};

export enum CardTypes {
  MASTERCARD = "mastercard",
  VISA = "visa",
  VERVE = "verve",
  AFRIGROBAL = "afriglobal",
  AMEX = "amex",
  DISCOVER = "discover",
  NOT_FOUND = "",
}
