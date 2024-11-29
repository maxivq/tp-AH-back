import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient("mongodb+srv://admin:admin@cluster0.rbczq.mongodb.net/mydatabase?retryWrites=true&w=majority");
const db = client.db("mydatabase");

async function getProductos(filtros = {}) {
  await client.connect();
  return db.collection("productos").find(filtros).toArray();
}

async function getProductoId(id) {
  if (!ObjectId.isValid(id)) {
    throw new Error("ID no válido");
  }
  await client.connect();
  return db.collection("productos").findOne({ _id: new ObjectId(id) });
}

async function agregarProducto(producto) {
  await client.connect();
  await db.collection("productos").insertOne(producto);
  return producto;
}

async function eliminarProducto(id) {
  if (!ObjectId.isValid(id)) {
    throw new Error("ID no válido");
  }
  await client.connect();
  await db.collection("productos").deleteOne({ _id: new ObjectId(id) });
  return id;
}

async function actualizarProducto(id, productoActualizado) {
  if (!ObjectId.isValid(id)) {
    throw new Error("ID no válido");
  }
  await client.connect();
  await db.collection("productos").updateOne({ _id: new ObjectId(id) }, { $set: productoActualizado });
  return productoActualizado;
}

async function getProductosPorCategoria(categoria) {
  await client.connect();
  return db.collection("productos").find({ categoria }).toArray();
}

async function getLimitedProductos(limit = 3) {
  await client.connect();
  return db.collection("productos").find().limit(limit).toArray();
}

export {
  getProductos,
  getProductoId,
  agregarProducto,
  eliminarProducto,
  actualizarProducto,
  getProductosPorCategoria,
  getLimitedProductos
};