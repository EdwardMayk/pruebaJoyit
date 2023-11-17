import express, { Request, Response } from 'express';
import cors from 'cors';
import { createToken } from './functions/createToken';
import { getCardData } from './functions/getCardData';

interface TokenRequest {
  cardNumber: number;
  cvv: number;
  expirationMonth: string;
  expirationYear: string;
  email: string;
}

const app = express();
const port = 3000;

app.use(express.json());

app.use(
  cors({
    origin: '*',
  })
);

app.post('/generate-token', (req: Request<{}, {}, TokenRequest>, res: Response) => {
  try {
    const { cardNumber, cvv, expirationMonth, expirationYear, email } = req.body;

    const token = createToken(cardNumber, cvv, expirationMonth, expirationYear, email);

    res.json({ token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/card-data', async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;

    if (!token || !token.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token no válido' });
    }

    const tokenValue = token.substring(7); 

    const cardData = await getCardData(tokenValue);

    res.json({ cardData });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
