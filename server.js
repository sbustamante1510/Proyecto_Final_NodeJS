const express = require('express');
const {routerApiProductos} = require('./routers/routerApiProductos.js');
const {routerApiCarrito} = require('./routers/routerApiCarrito.js');

const servidor = express();

//middleware
servidor.use(express.json());
servidor.use(express.urlencoded({extended: true}));
servidor.use('/',express.static('public'))

//rutas
servidor.use('/api/productos',routerApiProductos);
servidor.use('/api/carrito',routerApiCarrito);

const server = servidor.listen(8080, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});
server.on("error", error => console.log(`Error en servidor ${error}`));
