import jwt from 'jsonwebtoken';
import { MongoClient, ObjectId } from 'mongodb';

const client = new MongoClient("mongodb+srv://admin:admin@cluster0.rbczq.mongodb.net/mydatabase?retryWrites=true&w=majority");
const db = client.db("mydatabase");

// Clave secreta para firmar los tokens
const SECRET_KEY = "tu-nueva-clave-secreta-segura";

export async function crearToken(usuario) {
    const token = jwt.sign({ id: usuario._id, role: usuario.role }, SECRET_KEY, {
        expiresIn: "2h" // 2 horas
    });

    return token;
}

export async function validarToken(token) {
    try {
        const payload = jwt.verify(token, SECRET_KEY);
        return payload;
    } catch (error) {
        throw new Error("Token invalido");
    }
}