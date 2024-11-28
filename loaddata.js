import fs from 'fs';
import mongoose from 'mongoose';
import Producto from './models/producto.model.js';
import connectDB from './db/db.js';

// Conectar a MongoDB
connectDB();

const loadData = async () => {
    try {
        // Leer el archivo productos.json
        const data = fs.readFileSync('./data/productos.json', 'utf-8');
        const productos = JSON.parse(data);

        // Eliminar todos los productos existentes
        await Producto.deleteMany();

        // Insertar los productos del archivo JSON
        await Producto.insertMany(productos);

        console.log('Datos cargados correctamente');
        process.exit();
    } catch (error) {
        console.error('Error al cargar los datos', error);
        process.exit(1);
    }
};

loadData();