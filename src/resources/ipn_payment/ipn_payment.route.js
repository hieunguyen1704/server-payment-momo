import { Router } from 'express';
import { ipnPayment } from './ipn_payment.service';

const router = Router();

router.route('/').post(ipnPayment);

export default router;