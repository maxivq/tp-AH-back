import * as tokenService from "../services/token.service.js";

export async function validateToken(req, res, next) {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) return res.status(401).json({ message: "Token no encontrado" });
        const token = authHeader.split(' ')[1];
        const usuario = await tokenService.validarToken(token);
        if (!usuario) return res.status(401).json({ message: "Token invalido" });
        req.usuario = usuario;
        next();
    } catch (error) {
        res.status(401).json({ message: "Token invalido" });
    }
}

export const isAdmin = (req, res, next) => {
    if (req.usuario.role !== 'admin') {
        console.log('Require Admin Role');
        return res.status(403).json({ message: 'Require Admin Role' });
    }
    next();
};