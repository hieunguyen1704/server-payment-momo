import moment from 'moment';
import crypto from 'crypto';
import { momoConfig } from '../../config/momo_payment';

export const ipnPayment = (req, res) => {
  console.log('ipn request', req.body );
  const {
    partnerCode,
    accessKey,
    requestId,
    orderId,
    errorCode,
    message,
    localMessage,
    extraData,
    signature,
    amount,
    orderInfo,
    orderType,
    transId,
    responseTime,
    payType
  } = req.body;
  //check signature
  const reqRawSignature = `partnerCode=${partnerCode}&accessKey=${accessKey}&requestId=${requestId}&amount=${amount}&orderId=${orderId}&orderInfo=${orderInfo}&orderType=${orderType}&transId=${transId}&message=${message}&localMessage=${localMessage}&responseTime=${responseTime}&errorCode=${errorCode}&payType=${payType}&extraData=${extraData}`;
  const reqCheckSignature = crypto
    .createHmac('sha256', momoConfig.secretKey)
    .update(reqRawSignature)
    .digest('hex');
  const systemResponseTime = moment().format('YYYY-MM-DD HH:mm:ss');
  let resRawSignature = `partnerCode=${partnerCode}&accessKey=${accessKey}&requestId=${requestId}&orderId=${orderId}&errorCode=${errorCode}&message=${message}&responseTime=${responseTime}&extraData=${extraData}`;
  let resCheckSignature = crypto
  .createHmac('sha256', momoConfig.secretKey)
  .update(resRawSignature)
  .digest('hex');
  if (errorCode === 0 && reqCheckSignature === signature) {
    console.log('ipn success');
    const responseData = {
      partnerCode,
      accessKey,
      requestId,
      orderId,
      errorCode,
      message,
      responseTime: systemResponseTime,
      extraData,
      signature: resCheckSignature,
    };
    return res.status(200).json(responseData);
  }
  if(reqCheckSignature !== signature){
    resRawSignature = `partnerCode=${partnerCode}&accessKey=${accessKey}&requestId=${requestId}&orderId=${orderId}&errorCode=5&message=Chữ ký không hợp lệ.&responseTime=${responseTime}&extraData=${extraData}`
    resCheckSignature = crypto
    .createHmac('sha256', momoConfig.secretKey)
    .update(resRawSignature)
    .digest('hex');
    console.log('ipn fail');
    return res.status(400).json({
      partnerCode,
      accessKey,
      requestId,
      orderId,
      errorCode: 5,
      message: 'Chữ ký không hợp lệ.',
      responseTime: systemResponseTime,
      extraData,
      signature: resCheckSignature,
    });
  }
  console.log('ipn fail');
  return res.status(400).json({
    partnerCode,
    accessKey,
    requestId,
    orderId,
    errorCode,
    message,
    responseTime: systemResponseTime,
    extraData,
    signature :resCheckSignature,
  });
};
