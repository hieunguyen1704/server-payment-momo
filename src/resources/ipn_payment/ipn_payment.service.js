import moment from 'moment';
import { momoConfig } from '../../config/momo_payment';

export const ipnPayment = (req, res) => {
  const {
    partnerCode,
    accessKey,
    requestId,
    orderId,
    errorCode,
    message,
    extraData,
    signature,
    amount,
    orderInfo,
  } = req.body;
  const responseTime = moment().format('YYYY-MM-DD HH:mm:ss');
  //check signature
  const rawSignature = `partnerCode=${momoConfig.partnerCode}&accessKey=${momoConfig.accessKey}&requestId=${requestId}&amount=${amount}&orderId=${orderId}&orderInfo=${orderInfo}&returnUrl=${momoConfig.returnUrl}&notifyUrl=${momoConfig.notifyUrl}&extraData=${extraData}`;
  const systemSignature = crypto
    .createHmac('sha256', momoConfig.secretKey)
    .update(rawSignature)
    .digest('hex');
  console.log(systemSignature, signature);
  if (errorCode === 0 && systemSignature === signature) {
    const responseData = {
      partnerCode,
      accessKey,
      requestId,
      orderId,
      errorCode,
      message,
      responseTime,
      extraData,
      signature,
    };
    return res.status(200).json(responseData);
  }
  return res.status(400).json({
    partnerCode,
    accessKey,
    requestId,
    orderId,
    errorCode,
    message: 'Kiểm tra thất bại',
    responseTime,
    extraData,
    signature,
  });
};
