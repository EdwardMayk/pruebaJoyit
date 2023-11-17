export function validateInputData(cardNumber: number, cvv: number, expirationMonth: string, expirationYear: string, email: string): boolean {
    const isCardNumberValid = isValidCardNumber(cardNumber);
    const isCVVValid = isValidCVV(cvv);
    const isExpirationMonthValid = isValidExpirationMonth(expirationMonth);
    const isExpirationYearValid = isValidExpirationYear(expirationYear);
    const isEmailValid = isValidEmail(email);

    console.log('Datos de entrada válidos:', isCardNumberValid && isCVVValid && isExpirationMonthValid && isExpirationYearValid && isEmailValid);


    return isCardNumberValid && isCVVValid && isExpirationMonthValid && isExpirationYearValid && isEmailValid;
}

function isValidCardNumber(cardNumber: number): boolean {
    const cardNumberStr = cardNumber.toString();
    const isLengthValid = cardNumberStr.length >= 13 && cardNumberStr.length <= 16;
    const isLuhnValid = validateLuhnAlgorithm(cardNumberStr);

    if (!isLengthValid) {
        console.log('Longitud de la tarjeta inválida.');
    }

    if (!isLuhnValid) {
        console.log('Número de tarjeta inválido por el algoritmo de Luhn:', cardNumberStr);
    }

    return isLengthValid && isLuhnValid;
}


function validateLuhnAlgorithm(cardNumberStr: string): boolean {
    let sum = 0;
    let isEven = false;
  
    for (let i = cardNumberStr.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumberStr.charAt(i), 10);
  
      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
  
      sum += digit;
      isEven = !isEven;
    }
  
    return sum % 10 === 0;
}


function isValidCVV(cvv: number): boolean {
    const cvvStr = cvv.toString();

    return (cvvStr.length === 3 || cvvStr.length === 4) && (cvvStr === '123' || cvvStr === '4532'); // CVV de ejemplo
}

function isValidExpirationMonth(expirationMonth: string): boolean {
    const month = parseInt(expirationMonth, 10);

    return month >= 1 && month <= 12;
}

function isValidExpirationYear(expirationYear: string): boolean {
    const year = parseInt(expirationYear, 10);
    const currentYear = new Date().getFullYear();

    return year >= currentYear && year <= currentYear + 5;
}

function isValidEmail(email: string): boolean {
    console.log('Email válido:', /^\S+@\S+\.\w+$/.test(email));
    return /^\S+@\S+\.\w+$/.test(email);
}
