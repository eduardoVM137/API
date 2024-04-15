import express from 'express';
import https from 'https';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const app = express();

// Convertimos la URL del módulo a una ruta de archivo
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Asumiendo que 'Certificado' es una carpeta en la misma ubicación que tu script
const keyPath = path.join(__dirname, 'Certificado', 'key.pem');
const certPath = path.join(__dirname, 'Certificado', 'cert.pem');

if (!fs.existsSync(keyPath) || !fs.existsSync(certPath)) {
    console.error(`El archivo de clave privada o certificado no existe`);
    console.error(`Buscado en: ${keyPath}`);
    console.error(`Buscado en: ${certPath}`);
    process.exit(1); // Salir si no existe alguno de los archivos
}

const options = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath)
};

app.get('/', (req, res) => {
    res.send('Hello World!');
});

https.createServer(options, app).listen(8000, () => {
    console.log('Servidor HTTPS escuchando en el puerto 8000');
});