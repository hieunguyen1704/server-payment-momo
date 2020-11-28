import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { momoConfig } from '../../config/momo_payment';
import { meta } from '../../request/response.meta';
import crypto from 'crypto';


export const initPayment =  (req, res) =>{

  // fake data
    const randomId = uuidv4();
    const orderId  = randomId;
    const requestId = randomId;
    const orderInfo = "SDK team.";
    const amount = '150000';
    const extraData = "email=abc@gmail.com";

    const rawSignature = `partnerCode=${momoConfig.partnerCode}&accessKey=${momoConfig.accessKey}&requestId=${requestId}&amount=${amount}&orderId=${orderId}&orderInfo=${orderInfo}&returnUrl=${momoConfig.returnUrl}&notifyUrl=${momoConfig.notifyUrl}&extraData=${extraData}`;
    const signature = crypto.createHmac('sha256', momoConfig.secretKey)
    .update(rawSignature)
    .digest('hex');
    const initPaymentInfo = {
      partnerCode : momoConfig.partnerCode,
      accessKey :momoConfig.accessKey,
      requestId,
      amount,
      orderInfo,
      returnUrl : momoConfig.returnUrl,
      notifyUrl : momoConfig.notifyUrl,
      extraData,
      requestType : momoConfig.requestType,
      signature,
      orderId
    };
    axios.post(momoConfig.initPaymentEndpoint, initPaymentInfo).then((response)=>{
        if(response.data && response.data.errorCode === 0){
          return res.status(200).json({meta: meta.success , data: response.data});
        }
        return res.status(400).json({meta: meta.error});
    }).catch((error)=>{
      return res.status(400).json({meta: meta.error ,data: error.message});
    });         
}