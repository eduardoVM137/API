import express from 'express';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const app = express();
app.use(express.json());
 
const __dirname = path.dirname(fileURLToPath(import.meta.url));
 
const PRIVATE_KEY = fs.readFileSync(path.join(__dirname, 'Certificado', 'private_key.pem'), 'utf8');
const PUBLIC_KEY = fs.readFileSync(path.join(__dirname, 'Certificado', 'public_key.pem'), 'utf8');
 
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: "Acceso denegado. No se proporcionó token." });

    jwt.verify(token, PUBLIC_KEY, { algorithms: ['RS256'] }, (err, decoded) => {
        if (err) return res.status(401).json({ message: "Token inválido." });
        req.user = decoded;
        next();
    });
}; 
app.post('/login', (req, res) => {
    const { username } = req.body;
    const user = { id: 1, username };
    const token = jwt.sign(user, PRIVATE_KEY, { algorithm: 'RS256', expiresIn: '1h' });
    res.json({ token });
}); 
app.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'Contenido protegido', user: req.user });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
