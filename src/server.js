import express from 'express';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import { corsOptions } from './config/cors';
import  initPaymentRoute  from './resources/init-payment/init_payment.route';
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', function (req, res) {
  res.send('Hello');
});

app.use(cors(corsOptions));
app.use(urlencoded({ extended: true }));

app.use(json());

app.use('/init-payment', initPaymentRoute );

export const start = () => {
  try {
    app.listen(PORT, () => {
      console.log(`REST API on http://localhost:${PORT}/`);
    });
  } catch (e) {
    console.error(e);
  }
};
