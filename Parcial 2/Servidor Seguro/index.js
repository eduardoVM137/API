import express from 'express';
import path from 'path';
import fs from 'fs';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const keyPath = path.join(__dirname, 'Certificado', 'key.pem');
const certPath = path.join(__dirname, 'Certificado', 'cert.pem');

const options = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath)
};

app.get('/', (req, res) => {
    res.send('Hello World!');
});

https.createServer(options, app).listen(8000, () => {
    console.log('Server is running on https://localhost:8000');
});

// import express from 'express';
// import path from 'path';
// import fs from 'fs'

// import https from 'https';

// import { fileURLToPath } from 'url';
// const app = express();


// const __filename = fileURLToPath(
//     import.meta.url);
// const __dirname = path.dirname(__filename);

// const keyPath = path.join(__dirname, 'Certificado', 'key.pem');
// const certPath = path.join(__dirname, 'Certificado', 'cert.pem');

// app.get('/', (req, res, next) => {
//     res.send('Hello World!');
// });
// const options = {
//     key: fs.readFileSync(keyPath),
//     cert: fs.readFileSync(certPath)
// };

// https.createServer(options, (req, res) => {
//     res.writeHead(200);
//     res.end('hello world\n');
// }).listen(8000);lo world\n');
// }).listen(8000);