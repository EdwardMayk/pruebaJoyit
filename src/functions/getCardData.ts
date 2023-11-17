import { retrieveCardDataFromDB } from "../db/redis/redisConnect";

export async function getCardData(token: string): Promise<object | string> {
  console.log('Token recibido:', token);
  const prefix = 'pk_test_'; 

  if (!token.startsWith(prefix) || token.length !== (prefix.length + 16)) {
    return 'Token no válido';
  }


  const cardData = await retrieveCardDataFromDB(token);

  if (cardData) {
    return cardData;
  } else {
    return 'Los datos de la tarjeta ya no están presentes o han expirado';
  }
}
