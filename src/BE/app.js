import Express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import checkout from './checkout';


const app = new Express();
app.use(cors());
app.use(bodyParser.json());

app.post('/checkout', checkout);

export default app;
