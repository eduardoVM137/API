const express = require('express');
const path = require("path");
//const basicAuth = require("express-basic-auth");
const app = express();
app.get('/', (req, res, next) => {
    res.send('Hello World!');
});
app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
app.use("/public", express.static(path.join(__dirname, 'public')))