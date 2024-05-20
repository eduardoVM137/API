const express = require('express');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const fs = require('fs');
const specs = require('./docs/swagger');
const maestrosRouter = require('./routes/maestros');

const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Ruta para servir el JSON de la especificación de la API
app.get('/api-docs-json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(specs);
});

// Ruta para servir la documentación de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Ruta para servir la hoja de estilo personalizada
app.use('/swagger-custom.css', express.static(path.join(__dirname, 'docs', 'swagger-custom.css')));

// Ruta para servir la documentación de Redoc
app.get('/redoc', (req, res) => {
  res.sendFile(path.join(__dirname, 'docs', 'redoc.html'));
});

// Usar las rutas de maestros
app.use(maestrosRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Swagger UI: http://localhost:${port}/api-docs`);
  console.log(`ReDoc: http://localhost:${port}/redoc`);
});
