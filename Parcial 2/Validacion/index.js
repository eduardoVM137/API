import express from 'express';
import mysql from 'mysql2/promise';
import { check, validationResult } from 'express-validator';
const app = express();
app.use(express.json()); // Middleware para parsear JSON


const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: "asistec",
});

// A simple SELECT query


app.post('/insertar-maestro', check('edad').isNumeric(), async(req, res) => {
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            // Si result NO está vacío, hay errores de validación.
            return res.status(400).json({ errors: result.array() });
        }

        const { nombre, apeido_paterno, apeido_materno, edad } = req.body;
        const sql = 'CALL spinsertar_maestro(?, ?, ?,?)';
        const conn = await connection;
        await conn.query(sql, [nombre, apeido_paterno, apeido_materno, edad]);
        res.status(200).send('Maestro insertado con éxito');

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al insertar maestross');
    }
})



// app.post('/insertar-maestro2', async(req, res) => {
//     try {
//         const { nombre, apeidoPaterno, apeidoMaterno, edad } = req.body;
//         const sql = 'CALL spinsertar_maestro(?, ?, ?,?)';
//         const conn = await connection;
//         await conn.query(sql, [nombre, apeidoPaterno, apeidoMaterno, edad]);
//         res.status(200).send('Maestro insertado con éxito');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error al insertar maestro');
//     }
// });


app.put('/editar-maestro', check('edad').isNumeric(), check('idmaestro').isNumeric(), async(req, res) => {
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            // Si result NO está vacío, hay errores de validación.
            return res.status(400).json({ errors: result.array() });
        }
        const { idmaestro, nombre, apeido_paterno, apeido_materno, edad } = req.body;
        const sql = 'CALL spEditar_Maestro(?,?,?, ?, ?)';
        const conn = await connection;
        await conn.query(sql, [idmaestro, nombre, apeido_paterno, apeido_materno, edad]);
        res.status(200).send('Maestro editado con éxito');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al insertar maestro');
    }
});
app.delete('/eliminar-maestro', check('idmaestro').isNumeric(), async(req, res) => {
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            // Si result NO está vacío, hay errores de validación.
            return res.status(400).json("Error en el tipo de dato Id Maestro");
        }
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



// app.put('/actualizar-maestro/:id', check('id').isNumeric(), async(req, res) => {
//     try {
//         const result = validationResult(req);
//         if (!result.isEmpty()) {
//             // Si result NO está vacío, hay errores de validación.
//             return res.status(400).json("Error de Validacion en id");
//         }
//         const { id } = req.params;
//         const { nombre, apeidoPaterno, apeidoMaterno } = req.body;
//         const sql = 'CALL spEditar_Maestro(?, ?, ?, ?)';
//         const conn = await connection;
//         await conn.query(sql, [id, nombre, apeidoPaterno, apeidoMaterno]);
//         res.status(200).send('Maestro actualizado con éxito');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error al actualizar maestro');
//     }
// });


// Iniciar el servidor
const PORT = 3080;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});