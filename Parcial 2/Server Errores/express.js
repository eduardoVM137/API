const express = require('express');
const app = express();

app.get('/maestros', (req, res, next) => {
    if (true) {
        res.send('Se Encontro maestros')
    } else {
        res.send('maestros')
    }
});

app.get('/alumnos', (req, res, next) => {
    // res.send('Servidor Express contestando en la ruta /alumnos')

    try {
        throw new Error('Error en /alumnos');
    } catch (error) {
        next(error);
    }
});

app.use((req, res, next) => {
    res.status(404).send('Recurso no encontrado');
});

app.use((err, req, res, next) => {
    res.status(500).send(err.message);
});

app.listen(3000, () => {
    console.log('Servidor Express escuchando en 3000');
});