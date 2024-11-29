import mongoose from "mongoose";
import dotenv from "dotenv";

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Conectado a MongoDB Atlas");
    } catch (error) {
        console.error("Error al conectar a MongoDB Atlas", error);
        process.exit(1); // Detener la aplicación si no se puede conectar a la base de datos
    }
};

export default connectDB;