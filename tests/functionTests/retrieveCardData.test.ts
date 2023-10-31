import { getCardData } from '../../src/functions/getCardData';
import * as retrieveCardDataFromDB from '../../src/db/redis/redisConnect';

jest.mock('../../src/db/redis/redisConnect');

describe('getCardData function', () => {
  it('should return card data when a valid token is provided', async () => {
    const validToken = 'pk_test_1234567890'; // Un token válido en la base de datos
    console.log('validToken: ', validToken);
    const expectedCardData = {
      cardNumber: 1234567890123456,
      expirationMonth: '12',
      expirationYear: '2025',
      email: 'example@example.com',
    };

    jest.spyOn(retrieveCardDataFromDB, 'retrieveCardDataFromDB').mockResolvedValue(expectedCardData);

    expect(await getCardData(validToken)).toEqual(expectedCardData);
  });

  it('should return "Token no válido" for an invalid token', async () => {
    const invalidToken = 'invalid_token'; // Un token inválido

    jest.spyOn(retrieveCardDataFromDB, 'retrieveCardDataFromDB').mockResolvedValue(null);
    
    const result = await getCardData(invalidToken);
    expect(result).toBe('Token no válido');
  });

  it('should return "Los datos de la tarjeta ya no están presentes o han expirado" if no card data is found', async () => {
    const expiredToken = 'pk_test_zNlu9dezIdYHDnkA'; // Un token que ha expirado o ya no está presente

    jest.spyOn(retrieveCardDataFromDB, 'retrieveCardDataFromDB').mockResolvedValue(null);

    const result = await getCardData(expiredToken);
    expect(result).toBe('Los datos de la tarjeta ya no están presentes o han expirado');
  });
});
