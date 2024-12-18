import bcrypt from 'bcryptjs';
import User from '../../models/user.model.js';
import { crearToken } from '../../services/token.service.js';

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const token = await crearToken(newUser);

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Correo electrónico o contraseña incorrectos' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Correo electrónico o contraseña incorrectos' });
    }

    const token = await crearToken(user);

    res.status(200).json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};