import express from 'express';
import mysql from 'mysql2/promise';

const app = express();
app.use(express.json()); // Middleware para parsear JSON


const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: "asistec",
});

// A simple SELECT query

app.post('/insertar-maestro', async(req, res) => {
    try {
        const { nombre, apeidoPaterno, apeidoMaterno } = req.body;
        const sql = 'CALL spinsertar_maestro(?, ?, ?)';
        const conn = await connection;
        await conn.query(sql, [nombre, apeidoPaterno, apeidoMaterno]);
        res.status(200).send('Maestro insertado con éxito');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al insertar maestro');
    }
});
app.put('/editar-maestro', async(req, res) => {
    try {
        const { idmaestro, nombre, apeidopaterno, apeidomaterno } = req.body;
        const sql = 'CALL spEditar_Maestro(?,?, ?, ?)';
        const conn = await connection;
        await conn.query(sql, [idmaestro, nombre, apeidopaterno, apeidomaterno]);
        res.status(200).send('Maestro editado con éxito');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al insertar maestro');
    }
});
app.delete('/eliminar-maestro', async(req, res) => {
    try {
        const { idmaestro } = req.body;
        const sql = 'CALL spEliminar_Maestro(?)';
        const conn = await connection;
        await conn.query(sql, [idmaestro]);
        res.status(200).send('Maestro Eliminado con éxito');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al Eliminado maestro');
    }
});

app.get('/mostrar-maestros', async(req, res) => {
    try {
        const sql = 'CALL spmostrar_maestros()';
        const conn = await connection;
        const [results] = await conn.query(sql);
        res.status(200).json(results[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los maestros');
    }
});



app.put('/actualizar-maestro/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const { nombre, apeidoPaterno, apeidoMaterno } = req.body;
        const sql = 'CALL spEditar_Maestro(?, ?, ?, ?)';
        const conn = await connection;
        await conn.query(sql, [id, nombre, apeidoPaterno, apeidoMaterno]);
        res.status(200).send('Maestro actualizado con éxito');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar maestro');
    }
});


// Iniciar el servidor
const PORT = 3080;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});