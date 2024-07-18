import { useCallback, useEffect, useState } from "react";

import BIN from "../model/bin.json";
import { Bin } from "../model/response";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setCardKey } from "../store/slices/card.slice";
import { CardTypes } from "../utils/helper";

interface CardFunction {
  cardNumberValidator: (_rule: any, value: any) => Promise<string>;
  validateExpiryDate: (cardExpiry: string) => boolean | string;
  handleExpiryChange: (text: string) => void;
  handleCardNumberChange: (text: string) => void;
  handleCvvChange: (text: string) => void;
  handlePinChange: (text: string) => void;
  expiryErr: string;
  expiryDate: string;
  cardNumberErr: string;
  cardNumber: string;
  cvv: string;
  cvvErr: string;
  pin: string;
  pinErr: string;
  isButtonDisabled: boolean;
}

const useCard = (): CardFunction => {
  const [expiryErr, setExpiryErr] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardNumberErr, setCardNumberErr] = useState("");
  const [cvv, setCvv] = useState("");
  const [cvvErr, setCvvErr] = useState("");
  const [pin, setPin] = useState("");
  const [pinErr, setPinErr] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isCardNumberValid, setIsCardNumberValid] = useState(false);
  const [isExpiryDateValid, setIsExpiryDateValid] = useState(false);
  const [isCvvValid, setIsCvvValid] = useState(false);
  const [isPinValid, setIsPinValid] = useState(false);
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => {
    return state.card;
  });

  const validateCardType = useCallback((value: string, bin: Bin[]): string => {
    let cardNumber = value.replace(/\s/g, "");

    // VISA
    const visa = new RegExp("^4");
    if (cardNumber.match(visa) !== null) {
      return CardTypes.VISA;
    }
    // MASTERCARD
    else if (
      /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(
        cardNumber,
      )
    ) {
      return CardTypes.MASTERCARD;
    }
    // Check for VERVE and AFRIGROBAL
    else if (bin?.length > 0) {
      let result = CardTypes.NOT_FOUND;
      bin = bin.filter((x) => x.Name === "VERVE");
      if (parseInt(cardNumber?.trim()?.slice(0, 4), 10) === 5640) {
        result = CardTypes.AFRIGROBAL;
      } else if (cardNumber.length >= 6 && cardNumber.slice(0, 1) !== "0") {
        cardNumber = cardNumber.slice(0, 6);
        for (const y of bin) {
          if (
            parseInt(cardNumber, 10) >= y.BinRangeMinimum &&
            parseInt(cardNumber, 10) <= y.BinRangeMaximum
          ) {
            return CardTypes.VERVE;
          }
        }
      }
      return result;
    }
    return CardTypes.NOT_FOUND;
  }, []);

  const getCardTypeValue = useCallback(
    (cardType: string) => {
      dispatch(
        setCardKey({
          key: "cardType",
          value: cardType,
        }),
      );
    },
    [dispatch],
  );

  const cardNumberValidator = (_rule: any, value: any): Promise<string> => {
    if (!value || typeof value !== "string" || value.trim() === "") {
      return Promise.resolve("");
    }

    const formattedValue = value.replace(/\s+/g, "");
    const result = validateCardType(formattedValue, BIN.Bin);
    if (result === CardTypes.NOT_FOUND) {
      getCardTypeValue(result);
      return Promise.reject(new Error("Invalid card number"));
    }
    getCardTypeValue(result);
    return Promise.resolve(result);
  };

  const handleCardNumberChange = (text: string) => {
    const formattedText = text
      .replace(/\s/g, "")
      .replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardNumber(formattedText);

    cardNumberValidator(null, formattedText)
      .then(() => {
        setCardNumberErr("");
        setIsCardNumberValid(true);
      })
      .catch((e) => {
        setCardNumberErr(e.message);
        setIsCardNumberValid(false);
      });
  };

  const validateAndFormatExpiryDate = (cardExpiry: string): string => {
    const formattedExpiry = cardExpiry
      .replace(/[^0-9]/g, "") // Allow only numbers
      .replace(/^([2-9])$/g, "0$1") // 3 > 03
      .replace(/^(1{1})([3-9]{1})$/g, "0$1/$2") // 13 > 01/3
      .replace(/^0{1,}/g, "0") // 00 > 0
      .replace(/^([0-1]{1}[0-9]{1})([0-9]{2})$/g, "$1/$2"); // 113 > 11/3 or 1123 > 11/23

    return formattedExpiry.length > 2 && !formattedExpiry.includes("/")
      ? formattedExpiry.slice(0, 2) + "/" + formattedExpiry.slice(2)
      : formattedExpiry;
  };

  const validateExpiryDate = (cardExpiry: string): boolean | string => {
    const regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!regex.test(cardExpiry)) {
      return false;
    }

    const [, year] = cardExpiry.split("/");
    const currentYear = new Date().getFullYear() % 100; // Get last two digits of current year

    if (parseInt(year, 10) < currentYear) {
      return "The card has expired!";
    }

    return true;
  };

  const handleExpiryChange = (text: string) => {
    const formattedText = validateAndFormatExpiryDate(text);
    setExpiryDate(formattedText);

    const validationResult = validateExpiryDate(formattedText);
    if (validationResult === false) {
      setExpiryErr("Invalid expiry date");
      setIsExpiryDateValid(false);
    } else if (validationResult === "The card has expired!") {
      setExpiryErr("The card has expired!");
      setIsExpiryDateValid(false);
    } else {
      setExpiryErr("");
      setIsExpiryDateValid(true);
    }
  };

  const validateCVV = (cvv: string, cardType: string): boolean | string => {
    // Remove any non-digit characters
    const formattedCVV = cvv.replace(/\D/g, "");

    // Determine the valid length based on card type
    let validLength: number;
    switch (cardType) {
      case CardTypes.AMEX:
        validLength = 4;
        break;
      case CardTypes.VISA:
      case CardTypes.MASTERCARD:
      case CardTypes.DISCOVER:
      default:
        validLength = 3;
        break;
    }

    // Validate the CVV length
    if (formattedCVV.length !== validLength) {
      return `CVV must be ${validLength} digits long`;
    }

    return true;
  };

  const handleCvvChange = (text: string) => {
    setCvv(text);
    const result = validateCVV(text, state.cardType);
    if (result !== true) {
      setCvvErr(result as string);
      setIsCvvValid(false);
    } else {
      setCvvErr("");
      setIsCvvValid(true);
    }
  };

  const handlePinChange = (text: string) => {
    const formattedPin = text.replace(/\D/g, "");
    if (formattedPin.length !== 4) {
      setPinErr("PIN must be four digits");
      setIsPinValid(false);
    } else {
      setPin(formattedPin);
      setIsPinValid(true);
      setPinErr("");
    }
  };

  useEffect(() => {
    setIsButtonDisabled(
      !(isCardNumberValid && isExpiryDateValid && isCvvValid && isPinValid),
    );
  }, [isCardNumberValid, isExpiryDateValid, isCvvValid, isPinValid]);

  return {
    cardNumberValidator,
    validateExpiryDate,
    handleExpiryChange,
    handleCardNumberChange,
    handleCvvChange,
    handlePinChange,
    isButtonDisabled,
    expiryErr,
    expiryDate,
    cardNumber,
    cardNumberErr,
    cvv,
    cvvErr,
    pin,
    pinErr,
  };
};

export default useCard;
