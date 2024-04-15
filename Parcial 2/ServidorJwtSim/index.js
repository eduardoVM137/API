import express from 'express';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const app = express();
app.use(express.json());

const SECRET_KEY = 'tu_super_secreto';

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(403);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

app.post('/login', (req, res) => {
    const { username } = req.body;
    const user = { id: 1, username };
    const token = jwt.sign(user, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});

app.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'Contenido protegido', user: req.user });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
