export const endpoints = {
  create_payment: "/api/pgs/payment/v2/createPayment",
  charge_by_card: "/api/cps/v1/chargeCard",
  authorize_transaction: "/api/cps/v1/authorizeTransaction",
  charge_by_transfer: "/api/cps/v1/initiateBankTransfer",
  transaction_status: "/api/cps/v1/getTransactionStatus",
  charge_by_ussd: "/api/pgs/payment/v1/makePayment",
  payment_details: "/api/pgs/payment/v1/getPaymentDetails/",
  insert_publickey: "/api/pgs/clients/v1/publicKey",
};
