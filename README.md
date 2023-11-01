# Proyecto de Creación y Validación de Tarjetas

Este proyecto es una aplicación que genera y valida números de tarjetas de crédito. Utiliza un algoritmo de Luhn para validar la autenticidad de los números de tarjetas generados.

## Estructura del Proyecto

El proyecto consta de los siguientes elementos:

- `src/functions/`: Contiene las funciones relacionadas con la creación y validación de tarjetas.
- `src/db/redis/`: Conexión y métodos para interactuar con Redis.
- `src/utils/`: Utilidades y métodos auxiliares para la validación de datos.
- `serverless.yml`: Configuración del despliegue en AWS Lambda usando Serverless Framework.
- `package.json`: Dependencias y scripts del proyecto.
- Otros archivos de configuración o utilidad según sea necesario.

## Funciones Principales

### Generar Números de Tarjetas

La función `createToken` en `src/functions/createToken.ts` es responsable de generar un número de tarjeta aleatorio y almacenarlo en una base de datos, en este caso, Redis.

### Validar Números de Tarjetas

El algoritmo de validación se encuentra en `src/utils/dataValidation.ts`. Utiliza el algoritmo de Luhn para validar la autenticidad de los números de tarjetas.

## Configuración y Despliegue

El proyecto utiliza AWS Lambda y Redis para su funcionamiento. Para desplegarlo en AWS, se utiliza el archivo `serverless.yml`. Asegúrate de tener las credenciales de AWS configuradas en tu entorno.

## Uso

1. Clona este repositorio.
2. Ejecuta `npm install` para instalar las dependencias.
3. Ejecuta `npm run test` para ejecutar los tests correctamente.
4. Utiliza `serverless deploy` para desplegar el proyecto en AWS Lambda.
5. Consulta y prueba las funciones con Postman o herramientas similares.

## Notas

- Asegúrate de contar con las credenciales de AWS y la configuración de Redis para un funcionamiento correcto.
- Ten cuidado al generar tarjetas válidas, no utilices datos reales de tarjetas de crédito.

## Contribuciones

Siéntete libre de realizar mejoras, correcciones de errores o nuevas características y enviar solicitudes de extracción.

¡Gracias!
