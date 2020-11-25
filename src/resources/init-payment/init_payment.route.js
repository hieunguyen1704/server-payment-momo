import { Router } from 'express';
import { initPayment } from './init_payment.service';

const router = Router();

router.route('/').get(initPayment);

export default router;
