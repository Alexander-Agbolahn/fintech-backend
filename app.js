import express from 'express';
import cors from 'cors';
import { body, validationResult } from 'express-validator';
import connection from './models/db';
import userRouter from './routes/userAccounts'


const app = express();
const port = process.env.PORT || 9000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('My Fintech Challenge');
  });
  
  
// app.all('*', (req, res) => {
//     res.status(404).json({
//       status: 404,
//       error: 'that route does not exist',
//     });
//   });
  
app.listen(port, () => {
    console.log('Your app is being served on port', port);
  });
  
export default app;
  