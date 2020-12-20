export const momoConfig = {
    initPaymentEndpoint: 'https://test-payment.momo.vn/gw_payment/transactionProcessor',
    partnerCode : 'MOMOGIHP20201122',
    accessKey: 'hwEoIu5v6zdb6TFJ',
    secretKey: 'NYsh60V43h0eoXvi8tYxubNvfYUwe2NV',
    requestType: "captureMoMoWallet",
    notifyUrl: "https://payment-server-momo.herokuapp.com/ipn-payment", // need to change
    returnUrl: "https://hcmut-milktea.herokuapp.com/products", // need to change
}