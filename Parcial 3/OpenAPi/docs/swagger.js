const swaggerJsdoc = require('swagger-jsdoc');

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
    components: {
      schemas: {
        Maestro: {
          type: 'object',
          required: ['idMaestro', 'Nombre', 'Apellido_Paterno', 'Apellido_Materno'],
          properties: {
            idMaestro: { type: 'integer', description: 'ID del maestro' },
            Nombre: { type: 'string', description: 'Nombre del maestro' },
            Apellido_Paterno: { type: 'string', description: 'Apellido paterno del maestro' },
            Apellido_Materno: { type: 'string', description: 'Apellido materno del maestro' }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);
module.exports = specs;
