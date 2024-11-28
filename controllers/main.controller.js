import express from "express";
import path from "path";

const router = express.Router();

// Obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Página principal
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/index.html"));
});

// Página de contacto
router.get("/contacto", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/contacto.html"));
});

export default router;