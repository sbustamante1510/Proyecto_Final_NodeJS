const express = require('express');
const { controladorPostCarrito,
    controladorGetCarritoId,controladorPostCarritoId,
    controladorDeleteCarritoId,controladorDeleteCarritoIdProducto

    } = require("../controllers/controladorApiCarrito");

const routerApiCarrito = express.Router();

routerApiCarrito.get('/:id/productos',controladorGetCarritoId);
routerApiCarrito.post('/',controladorPostCarrito);
routerApiCarrito.post('/:id/productos',controladorPostCarritoId);
routerApiCarrito.delete('/:id',controladorDeleteCarritoId);
routerApiCarrito.delete('/:id/productos/:id_prod',controladorDeleteCarritoIdProducto);


exports.routerApiCarrito = routerApiCarrito;