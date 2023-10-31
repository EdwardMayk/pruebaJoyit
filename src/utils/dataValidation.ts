export function validateInputData(cardNumber: number, cvv: number, expirationMonth: string, expirationYear: string, email: string): boolean {
    const isCardNumberValid = isValidCardNumber(cardNumber);
    const isCVVValid = isValidCVV(cvv);
    const isExpirationMonthValid = isValidExpirationMonth(expirationMonth);
    const isExpirationYearValid = isValidExpirationYear(expirationYear);
    const isEmailValid = isValidEmail(email);

    // Devolver true si todos los parámetros son válidos, de lo contrario, false
    return isCardNumberValid && isCVVValid && isExpirationMonthValid && isExpirationYearValid && isEmailValid;
}

function isValidCardNumber(cardNumber: number): boolean {
    const cardNumberStr = cardNumber.toString();
    // Validar longitud y algoritmo de Luhn
    return cardNumberStr.length >= 13 && cardNumberStr.length <= 16 && validateLuhnAlgorithm(cardNumberStr);
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
    return (sum % 10) === 0;
}

function isValidCVV(cvv: number): boolean {
    const cvvStr = cvv.toString();
    // Validar longitud y patrón (dependiendo de la marca de la tarjeta)
    return (cvvStr.length === 3 || cvvStr.length === 4) && (cvvStr === '123' || cvvStr === '4532'); // CVV de ejemplo
}

function isValidExpirationMonth(expirationMonth: string): boolean {
    const month = parseInt(expirationMonth, 10);
    // Validar rango del mes (1 a 12)
    return month >= 1 && month <= 12;
}

function isValidExpirationYear(expirationYear: string): boolean {
    const year = parseInt(expirationYear, 10);
    const currentYear = new Date().getFullYear();
    // Validar que el año sea el actual o hasta 5 años en el futuro
    return year >= currentYear && year <= currentYear + 5;
}

function isValidEmail(email: string): boolean {
    // Validar formato y dominios permitidos
    return /^[^\s@]+@[^\s@]+\.(gmail\.com|hotmail\.com|yahoo\.es)$/.test(email);
}
