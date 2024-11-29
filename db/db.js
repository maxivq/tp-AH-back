import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb+srv://admin:admin@cluster0.rbczq.mongodb.net/mydatabase?retryWrites=true&w=majority");

const connectDB = async () => {
  try {
    await client.connect();
    console.log("Conectado a MongoDB Atlas");
    const db = client.db("mydatabase"); // Nombre de la base de datos
    return db;
  } catch (error) {
    console.error("Error al conectar a MongoDB Atlas", error);
    process.exit(1);
  }
};

export default connectDB;