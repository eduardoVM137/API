import express from 'express';
import path from 'path';

import fs from 'fs'

const app = express();




app.get('/', (req, res, next) => {
    res.send('Hello World!');
});
const options = {
    key: fs.readFileSync(express.static(path.join(__dirname, './Certificado/key.pem'))),
    cert: fs.readFileSync(express.static(path.join(__dirname, './Certificado/cert.pem')))
};

https.createServer(options, (req, res) => {
    res.writeHead(200);
    res.end('hello world\n');
}).listen(8000);