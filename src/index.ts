// Importa las funciones que se usarán como puntos de entrada a las Lambda Functions
import { createToken } from './functions/createToken';
import { getCardData } from './functions/getCardData';

// Exporta las funciones para su uso en las Lambda Functions o cualquier otro componente
export {
  createToken,
  getCardData,
};
