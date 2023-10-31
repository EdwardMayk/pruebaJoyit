import { createToken } from '../../src/functions/createToken';
import { storeDataInRedis } from '../../src/db/redis/redisConnect';
import * as dataValidation from '../../src/utils/dataValidation'; 

jest.mock('../../src/db/redis/redisConnect', () => ({
    storeDataInRedis: jest.fn(),
  }));

  
  describe('createToken function', () => {
    it('should throw an error when input data is invalid', () => {
        const invalidCardData = {
          cardNumber: 123, 
          cvv: 123,
          expirationMonth: '14', 
          expirationYear: '2020', 
          email: 'invalid-email', 
        };
      
        const dataValidationMock = jest.spyOn(dataValidation, 'validateInputData').mockReturnValue(false);

        expect(() =>
          createToken(
            invalidCardData.cardNumber,
            invalidCardData.cvv,
            invalidCardData.expirationMonth,
            invalidCardData.expirationYear,
            invalidCardData.email
          )
        ).toThrow('Datos de entrada no válidos');
    
        expect(storeDataInRedis).not.toHaveBeenCalled();
        expect(dataValidationMock).toHaveBeenCalledTimes(1);
      
        dataValidationMock.mockRestore();
    });
    it('should return a token when input data is valid', () => {
        const cardData = {
          cardNumber: 1234567890123456,
          cvv: 123,
          expirationMonth: '12',
          expirationYear: '2025',
          email: 'example@gmail.com',
        };
    
        const expectedToken = expect.any(String);
    
        // Aquí se espía el módulo completo para que validateInputData devuelva true
        const dataValidationMock = jest.spyOn(dataValidation, 'validateInputData').mockReturnValue(true);
    
        const generatedToken = createToken(
          cardData.cardNumber,
          cardData.cvv,
          cardData.expirationMonth,
          cardData.expirationYear,
          cardData.email
        );
    
        expect(storeDataInRedis).toHaveBeenCalledWith(expectedToken, cardData);
        expect(generatedToken).toEqual(expectedToken);
    
        dataValidationMock.mockRestore();
      });
  })

