const express = require('express');
const morgan = require('morgan');
const app = express();

//Funcion de middleware de un tercero
app.use(morgan('tiny'))
app.use(express.json());
app.use(express.text());

//Recibiendo parametros en la caadena de consulta
app.get("/alumnos", (req, res, next) => {
    console.log(req.query.nombre);
    res.send("Contestando a Get desde ServExpress-Alumnos");
});

//Recibiendo parametros como parte de la ruta
app.get("/maestros/:carrera", (req, res, next) => {
    console.log(req.params, carrera)
    res.send("Hola");
})

//Recibiendo parametros como Json en el body
app.get("/administrativos", (req, res, next) => {
    //console.log(req.body.id);
    console.log(req.body.nombre);
    for (const campo in req.body) {
        console.log(req.body[campo]);
    }
    res.send("Hola Administrativo");
})

app.listen(3000, () => {
    console.log("Servidor Express escuando en puerto 3000")
})