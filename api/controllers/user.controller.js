import * as service from "../../services/usuarios.service.js";
import jwt from 'jsonwebtoken';

const secret = 'tu-nueva-clave-secreta-segura';

// Registrar un nuevo usuario
export const registerUser = async (req, res) => {
  const { name, email, password, role = 'user' } = req.body;

  try {
    const newUser = { name, email, password, role };
    const usuario = await service.agregarUsuario(newUser);
    res.status(201).json({ message: 'Usuario registrado correctamente', usuario });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Iniciar sesión
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await service.loginUsuario(email, password);
    const token = jwt.sign({ id: usuario._id, role: usuario.role }, secret, { expiresIn: '1h' });
    res.json({ token, role: usuario.role });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Obtener todos los usuarios
export const getUsuarios = async (req, res) => {
  try {
    const usuarios = await service.getUsuarios();
    res.status(200).json(usuarios);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener un usuario por ID
export const getUsuarioId = async (req, res) => {
  const id = req.params.id;

  try {
    const usuario = await service.getUsuarioId(id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(usuario);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Actualizar un usuario
export const actualizarUsuario = async (req, res) => {
  const id = req.params.id;
  const { name, email, password, role } = req.body;

  try {
    const usuarioActualizado = { name, email, password, role };
    const usuario = await service.actualizarUsuario(id, usuarioActualizado);
    res.status(200).json(usuario);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Eliminar un usuario
export const eliminarUsuario = async (req, res) => {
  const id = req.params.id;

  try {
    await service.eliminarUsuario(id);
    res.status(200).json({ message: 'Usuario eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};