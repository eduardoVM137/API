const express = require('express');
const app = express();
import path from 'path';
import fs from 'fs'
//const basicAuth = require("express-basic-auth");
app.get('/', (req, res, next) => {
    res.send('Hello World!');
});
app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
app.use("/public", express.static(path.join(__dirname, 'public')))