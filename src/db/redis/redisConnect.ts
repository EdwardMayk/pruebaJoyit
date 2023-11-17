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


export function retrieveCardDataFromDB(token: string): Promise<CardData | null> {
  console.log('Token recibidoDB:', token);
  
  return client.get(token)
    .then((data: string | null) => {
      if (data) {
        return JSON.parse(data) as CardData;
      } else {
        return null;
      }
    })
    .catch((err: any) => {
      console.error('Error al buscar en Redis:', err);
      throw new Error('Error al buscar en Redis');
    });
}

