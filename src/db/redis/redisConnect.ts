import { promisify } from 'util';
import { createClient } from 'redis';

interface CardData {
  cardNumber: number;
  expirationMonth: string;
  expirationYear: string;
  email: string;
}

const client = createClient()

client.connect();

// client.on('connect', () => {
//   console.log('Conexión exitosa a Redis');
// });

// client.on('error', (err) => {
//   console.error('Error de conexión a Redis:', err);
// });

export function storeDataInRedis(token: string, cardData: object): void {
  client.setEx(token, 900, JSON.stringify(cardData));
}

const getAsync = promisify(client.get).bind(client);

export function retrieveCardDataFromDB(token: string): Promise<CardData| null > {
  return getAsync(token)
    .then((data: string | null) => {
      if (data) {
        return JSON.parse(data) as CardData;
      } else {
        return null;
      }
    })
    .catch((err: any) => {
      throw new Error(err);
    });
}
