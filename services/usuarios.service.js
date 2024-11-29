import { MongoClient, ObjectId } from "mongodb";
import bcrypt from "bcrypt";

const client = new MongoClient("mongodb+srv://admin:admin@cluster0.rbczq.mongodb.net/mydatabase?retryWrites=true&w=majority");
const db = client.db("mydatabase");

async function getUsuarios(filtros = {}) {
  await client.connect();
  return db.collection("users").find(filtros).toArray();
}

async function getUsuarioId(id) {
  await client.connect();
  return db.collection("users").findOne({ _id: new ObjectId(id) });
}

async function agregarUsuario(usuario) {
  await client.connect();
  const hashedPassword = await bcrypt.hash(usuario.password, 10);
  usuario.password = hashedPassword;
  await db.collection("users").insertOne(usuario);
  return usuario;
}

async function eliminarUsuario(id) {
  await client.connect();
  await db.collection("users").deleteOne({ _id: new ObjectId(id) });
  return id;
}

async function actualizarUsuario(id, usuarioActualizado) {
  await client.connect();
  if (usuarioActualizado.password) {
    const hashedPassword = await bcrypt.hash(usuarioActualizado.password, 10);
    usuarioActualizado.password = hashedPassword;
  }
  await db.collection("users").updateOne({ _id: new ObjectId(id) }, { $set: usuarioActualizado });
  return usuarioActualizado;
}

async function loginUsuario(email, password) {
  await client.connect();
  const usuario = await db.collection("users").findOne({ email });
  if (!usuario) {
    throw new Error("Usuario no encontrado");
  }
  const isMatch = await bcrypt.compare(password, usuario.password);
  if (!isMatch) {
    throw new Error("Contraseña incorrecta");
  }
  return usuario;
}

export {
  getUsuarios,
  getUsuarioId,
  agregarUsuario,
  eliminarUsuario,
  actualizarUsuario,
  loginUsuario
};