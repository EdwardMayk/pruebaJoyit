import { storeDataInRedis } from '../db/redis/redisConnect';
import { validateInputData } from '../utils/dataValidation';

function generateToken(): string {
  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const tokenLength = 16;
  const prefix = 'pk_test_';
  let token = '';
  for (let i = 0; i < tokenLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters.charAt(randomIndex);
  }
  console.log('Token generado: ', prefix + token);
  return prefix + token;
}

 export function createToken(
  cardNumber: number,
  cvv: number,
  expirationMonth: string,
  expirationYear: string,
  email: string
): string {
  if (!validateInputData(cardNumber, cvv, expirationMonth, expirationYear, email)) {
    throw new Error('Datos de entrada no válidos');
  }

  const token = generateToken();
  
  const cardData = { cardNumber, cvv, expirationMonth, expirationYear, email };

  storeDataInRedis(token, cardData);

  return token;
}
