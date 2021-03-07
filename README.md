# meli-api

API creada con NodeJS basada en Typescript que consume datos de la API de MercadoLibre:

API de MercadoLibre: ```https://api.mercadolibre.com```

Funciones de la API:

- Busqueda de productos.
- Detalle de un producto.
- Descripcion de un producto.

El servidor contiene las siguientes caracteristicas:

- **Express**: servidor web back-end.
- **Typescript**: lenguaje de programacion que transpila a Javascript.

- **Jest**: testing unitario.
- **Axios**: cliente HTTP.
- **Moxios/Supertest**: librerias para mocking de peticiones HTTP con Axios.
- **Eslint**: linter que examina la sintaxis del codigo y permite corregir.
- **Husky**: analizador de commits/push para ejecutar comandos antes de realizar dichas acciones (en nuestro caso, lo aplicamos sobre commit y push, se analiza el codigo y se ejecutan los tests).

## Contenido

## Instalacion

Debemos tener instalado Node >= 10 en nuestra PC.

Ejecutamos:

```bash
npm install
```

Esto instalara todas las librerias necesarias para poder trabajar con el proyecto.

### Variables de entorno
En el proyecto hay un archivo llamado ```.env.example```

Crear una copia con el nombre ```.env``` y configurar lo que creamos necesario:

```bash
NODE_ENV=production # Entorno
SERVER_HOST=localhost # IP donde escuchara el servidor.
SERVER_PORT=8080 # Puerto donde escuchara el servidor.
MELIAPI_URL=https://api.mercadolibre.com/ # URL del API de Mercadolibre.
```

## Comandos

### Iniciar el proyecto
```bash
npm run start
```
El mismo leera las variables de entorno que estan en el archivo .env

##### *Ejemplo de salida:*
```bash
lshoobridge-air:api lshoobridge$ npm run start
NodeJS Express server started at http://127.0.0.1:9090
```


### Iniciar el proyecto en modo desarrollo (abre un hot-reload):
```bash
npm run dev
```
De igual manera, leera las variables de entorno del archivo .env.
### Ejecutar tests
```bash
npm run test
```
### Ejecutar eslint
```bash
npm run lint
```
### Ejecutar eslint y fixear codigo
```bash
npm run lint:fix
```
### Compilar el proyecto a javascript
```bash
npm run build
```
Se generara la transpilacion de typescript a Javascript y el resultado estara en la carpeta *build/*.

Podemos ejecutar el servidor ya compilado con el comando:
```bash
node build/index.js
```

# Creditos

Sistema creado por Lucas Shoobridge para entrevista con MercadoLibre.