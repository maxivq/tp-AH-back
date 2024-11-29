import express from 'express';
import cors from 'cors';
import connectDB from './db/db.js';
import productosRoute from './api/routes/productos.routes.js';
import userRoute from './api/routes/user.routes.js';
import authRoutes from './api/routes/auth.routes.js';
import configureMiddleware from './middleware/middleware.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3333;

connectDB();

configureMiddleware(app);

app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Servir archivos estáticos desde la carpeta uploads
app.use('/api/productos', productosRoute); // Asegúrate de que la ruta esté correcta
app.use('/api/users', userRoute);
app.use('/api', authRoutes);

app.listen(PORT, () => console.log(`Servidor funcionando en el puerto ${PORT}`));