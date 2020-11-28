export const momoConfig = {
    initPaymentEndpoint: 'https://test-payment.momo.vn/gw_payment/transactionProcessor',
    partnerCode : 'MOMOIQA420180417',
    accessKey: 'Q8gbQHeDesB2Xs0t',
    secretKey: 'PPuDXq1KowPT1ftR8DvlQTHhC03aul17',
    requestType: "captureMoMoWallet",
    notifyUrl: "https://payment-server-momo.herokuapp.com/ipn-payment", // need to change
    returnUrl: "https://momo.vn", // need to change
}