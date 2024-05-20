const express = require('express');
const db = require('../config/database');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Maestro
 *   description: API para gestionar los maestros
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
router.get('/maestros', (req, res) => {
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
router.get('/maestros/:id', (req, res) => {
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
router.post('/maestros', (req, res) => {
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
router.put('/maestros/:id', (req, res) => {
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
router.delete('/maestros/:id', (req, res) => {
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

module.exports = router;
