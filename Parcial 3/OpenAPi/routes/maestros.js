const express = require("express");
const router = express.Router();

const maestros = require("../util/data");

/**
 * @swagger
 * components:
 *   schemas:
 *     maestro:
 *       type: object
 *       required:
 *         - nombre
 *         - apellidos
 *         - activo
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the maestro
 *         nombre:
 *           type: string
 *           description: The nombre of your maestro
 *         apellidos:
 *           type: string
 *           description: The maestro apellidos
 *         activo:
 *           type: boolean
 *           description: Whether you have activo reading the maestro
 *         fecha_ingreso:
 *           type: string
 *           format: date
 *           description: The date the maestro was added
 *       example:
 *         id: d5fE_asz
 *         nombre: The New Turing Omnibus
 *         apellidos: Alexander K. Dewdney
 *         activo: false
 *         fecha_ingreso: 2020-03-10T04:05:06.157Z
 */

/**
 * @swagger
 * tags:
 *   name: maestros
 *   description: The maestros managing API
 * /maestros:
 *   get:
 *     summary: Lists all the maestros
 *     tags: [maestros]
 *     responses:
 *       200:
 *         description: The list of the maestros
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/maestro'
 *   post:
 *     summary: Create a new maestro
 *     tags: [maestros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/maestro'
 *     responses:
 *       200:
 *         description: The created maestro.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/maestro'
 *       500:
 *         description: Some server error
 * /maestros/{id}:
 *   get:
 *     summary: Get the maestro by id
 *     tags: [maestros]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The maestro id
 *     responses:
 *       200:
 *         description: The maestro response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/maestro'
 *       404:
 *         description: The maestro was not found
 *   put:
 *    summary: Update the maestro by the id
 *    tags: [maestros]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The maestro id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/maestro'
 *    responses:
 *      200:
 *        description: The maestro was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/maestro'
 *      404:
 *        description: The maestro was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the maestro by id
 *     tags: [maestros]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The maestro id
 *
 *     responses:
 *       200:
 *         description: The maestro was deleted
 *       404:
 *         description: The maestro was not found
 */

router.get("/", function (req, res) {
  res.status(200).json(maestros);
});

router.get("/:id", function (req, res) {
  let maestro = maestros.find(function (item) {
    return item.id == req.params.id;
  });

  maestro ? res.status(200).json(maestro) : res.sendStatus(404);
});

router.post("/", function (req, res) {
  const { nombre, apellidos, activo } = req.body;

  let maestro = {
    id: maestros.length + 1,
    nombre: nombre,
    apellidos: apellidos,
    activo: activo !== undefined ? activo : false,
    fecha_ingreso: new Date(),
  };

  maestros.push(maestro);

  res.status(201).json(maestro);
});

router.put("/:id", function (req, res) {
  let maestro = maestros.find(function (item) {
    return item.id == req.params.id;
  });

  if (maestro) {
    const { nombre, apellidos, activo } = req.body;

    let updated = {
      id: maestro.id,
      nombre: nombre !== undefined ? nombre : maestro.nombre,
      apellidos: apellidos !== undefined ? apellidos : maestro.apellidos,
      activo: activo !== undefined ? activo : maestro.activo,
      fecha_ingreso: maestro.fecha_ingreso,
    };

    maestros.splice(maestros.indexOf(maestro), 1, updated);

    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

router.delete("/:id", function (req, res) {
  let maestro = maestros.find(function (item) {
    return item.id == req.params.id;
  });

  if (maestro) {
    maestros.splice(maestros.indexOf(maestro), 1);
  } else {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
});

module.exports = router;
