const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc'); 
const swaggerOptions = {
 definition: {
 openapi: '3.0.0',
 info: {
 title: 'API Empleados',
 version: '1.0.0',
 },
 servers:[
 {url: "http://localhost:8083"}
 ], 
 },
 apis: [`${path.join(__dirname,"./routes/ruta_empleado.js")}`],
 };
 
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerDocs));
 
/**
 * @swagger
 * /empleado:
    * get:
        * description: Welcome to swagger-jsdoc!
        * responses:
             * 200:
                 * description: Returns a mysterious string.
 */
router.get('/', async (req, res) => {
});
/**
 * @swagger
 * /empleado:
    * post:
        * description: Welcome to swagger-jsdoc!
        * responses:
            * 200:
              * description: Returns a mysterious string.
 */
router.post('/', async (req, res) => {
})