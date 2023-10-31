import { retrieveCardDataFromDB } from "../db/redis/redisConnect";

export async function getCardData(token: string): Promise<object | string> {
  const prefix = 'pk_test_'; // Asegúrate de que este sea tu prefijo válido

  // Verifica si el token es válido
  if (!token.startsWith(prefix) || token.length == 16) {
    return 'Token no válido';
  }

  // Obtén los datos de la tarjeta desde Redis
  const cardData = await retrieveCardDataFromDB(token);

  // Verificar si se encontraron datos
  if (cardData) {
    return cardData;
  } else {
    return 'Los datos de la tarjeta ya no están presentes o han expirado';
  }
}
