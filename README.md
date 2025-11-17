# E-commerce Backend (Node + Express + MongoDB)

## Requisitos
- Node.js >= 14
- npm
- MongoDB (local) o cuenta en MongoDB Atlas

## Configuración (local)
1. Clona/copiar el directorio `backend/`.
2. En la raíz crea un archivo `.env` con contenido basado en `.env.example`.
   Ejemplo:
     PORT=3000
     MONGODB_URI=mongodb://localhost:27017/ecommerce_db

3. Instala dependencias:
   npm install

4. Inicia MongoDB local (ej. en Windows con servicio, en Linux `sudo service mongod start`, o usa Docker).

5. (Opcional) Poblado inicial:
   npm run seed

6. Inicia el servidor:
   npm start
   o en desarrollo:
   npm run dev

7. Endpoints:
   - GET  /api/products?page=1&limit=4    -> paginación server-side
   - GET  /api/products                   -> todos los productos (array)
   - GET  /api/products/:id
   - POST /api/products   (body JSON: title, price, description, image, stock, category)
   - PUT  /api/products/:id
   - DELETE /api/products/:id

## Usar con el frontend
- Cambia `API_BASE` en tus scripts frontend a: `http://localhost:3000/api`
  por ejemplo en `products.js`:
    const API_BASE = 'http://localhost:3000/api';

- El endpoint se espera que devuelva la forma:
  GET /api/products?page=1&limit=4  -> 
  {
    "data": [ ... ],
    "page": 1,
    "limit": 4,
    "totalPages": 3,
    "totalItems": 10
  }

## MongoDB Atlas (opcional)
1. Crea cuenta en https://cloud.mongodb.com
2. Crea un cluster gratuito (Shared)
3. En "Database Access" crea usuario y contraseña.
4. En "Network Access" agrega tu IP o permite 0.0.0.0/0 (temporalmente).
5. Obtén la connection string (URI) y reemplázala en `.env` como:
   MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/ecommerce_db?retryWrites=true&w=majority

## Notas
- El seed borra la colección `products` antes de insertar.
- Si quieres más endpoints (cart, orders, auth), puedo agregarlos.
