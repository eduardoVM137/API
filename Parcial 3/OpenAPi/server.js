const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const app = express();
const port = 3000;

// Configuración de la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'asistec'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

// Middleware para parsear JSON
app.use(express.json());

// Configuración de Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Maestros',
      version: '1.0.0',
      description: 'API para gestionar la tabla de maestros en la base de datos asistec'
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./server.js'],
};

const specs = swaggerJsdoc(options);

// Ruta para servir el JSON de la especificación de la API
app.get('/api-docs-json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(specs);
});

// Ruta para servir la documentación de Swagger con CSS personalizado
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { customCssUrl: '/swagger-custom.css' }));

// Ruta para servir la hoja de estilo personalizada
app.use('/swagger-custom.css', express.static(path.join(__dirname, 'swagger-custom.css')));

// Ruta para servir la documentación de Redoc
app.get('/redoc', (req, res) => {
  res.sendFile(path.join(__dirname, 'redoc.html'));
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Maestro:
 *       type: object
 *       required:
 *         - idMaestro
 *         - Nombre
 *         - Apellido_Paterno
 *         - Apellido_Materno
 *       properties:
 *         idMaestro:
 *           type: integer
 *           description: ID del maestro
 *         Nombre:
 *           type: string
 *           description: Nombre del maestro
 *         Apellido_Paterno:
 *           type: string
 *           description: Apellido paterno del maestro
 *         Apellido_Materno:
 *           type: string
 *           description: Apellido materno del maestro
 */

/**
 * @swagger
 * /maestros:
 *   get:
 *     summary: Obtiene todos los maestros
 *     tags: [Maestro]
 *     responses:
 *       200:
 *         description: Lista de maestros
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Maestro'
 */
app.get('/maestros', (req, res) => {
  db.query('SELECT * FROM maestro', (err, results) => {
    if (err) {
      console.error('Error fetching maestros:', err);
      res.status(500).json({ error: 'Error fetching maestros' });
      return;
    }
    res.json(results);
  });
});

/**
 * @swagger
 * /maestros/{id}:
 *   get:
 *     summary: Obtiene un maestro por ID
 *     tags: [Maestro]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del maestro
 *     responses:
 *       200:
 *         description: Maestro encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Maestro'
 *       404:
 *         description: Maestro no encontrado
 */
app.get('/maestros/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM maestro WHERE idMaestro = ?', [id], (err, result) => {
    if (err) {
      console.error('Error fetching maestro:', err);
      res.status(500).json({ error: 'Error fetching maestro' });
      return;
    }
    if (result.length === 0) {
      res.status(404).json({ error: 'Maestro not found' });
      return;
    }
    res.json(result[0]);
  });
});

/**
 * @swagger
 * /maestros:
 *   post:
 *     summary: Crea un nuevo maestro
 *     tags: [Maestro]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Maestro'
 *     responses:
 *       201:
 *         description: Maestro creado
 *       500:
 *         description: Error creando el maestro
 */
app.post('/maestros', (req, res) => {
  const { idMaestro, Nombre, Apellido_Paterno, Apellido_Materno } = req.body;
  const query = 'INSERT INTO maestro (idMaestro, Nombre, Apellido_Paterno, Apellido_Materno) VALUES (?, ?, ?, ?)';
  db.query(query, [idMaestro, Nombre, Apellido_Paterno, Apellido_Materno], (err, result) => {
    if (err) {
      console.error('Error creating maestro:', err);
      res.status(500).json({ error: 'Error creating maestro' });
      return;
    }
    res.status(201).json({ message: 'Maestro created', id: result.insertId });
  });
});

/**
 * @swagger
 * /maestros/{id}:
 *   put:
 *     summary: Actualiza un maestro existente
 *     tags: [Maestro]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del maestro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Maestro'
 *     responses:
 *       200:
 *         description: Maestro actualizado
 *       500:
 *         description: Error actualizando el maestro
 */
app.put('/maestros/:id', (req, res) => {
  const { id } = req.params;
  const { Nombre, Apellido_Paterno, Apellido_Materno } = req.body;
  const query = 'UPDATE maestro SET Nombre = ?, Apellido_Paterno = ?, Apellido_Materno = ? WHERE idMaestro = ?';
  db.query(query, [Nombre, Apellido_Paterno, Apellido_Materno, id], (err, result) => {
    if (err) {
      console.error('Error updating maestro:', err);
      res.status(500).json({ error: 'Error updating maestro' });
      return;
    }
    res.json({ message: 'Maestro updated' });
  });
});

/**
 * @swagger
 * /maestros/{id}:
 *   delete:
 *     summary: Elimina un maestro
 *     tags: [Maestro]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del maestro
 *     responses:
 *       200:
 *         description: Maestro eliminado
 *       500:
 *         description: Error eliminando el maestro
 */
app.delete('/maestros/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM maestro WHERE idMaestro = ?', [id], (err, result) => {
    if (err) {
      console.error('Error deleting maestro:', err);
      res.status(500).json({ error: 'Error deleting maestro' });
      return;
    }
    res.json({ message: 'Maestro deleted' });
  });
});

// Crear el archivo redoc.html
const redocHtml = `
<!DOCTYPE html>
<html>
  <head>
    <title>ReDoc</title>
    <!-- Needed for adaptive design -->
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      body {
        margin: 0;
        padding: 0;
      }
    </style>
  </head>
  <body>
    <redoc spec-url='/api-docs-json'></redoc>
    <script src="https://cdn.jsdelivr.net/npm/redoc@next/bundles/redoc.standalone.js"> </script>
  </body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'redoc.html'), redocHtml);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Swagger UI: http://localhost:${port}/api-docs`);
  console.log(`ReDoc: http://localhost:${port}/redoc`);
});
