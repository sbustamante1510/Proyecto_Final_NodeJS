const express = require('express');
const { controladorGetProductos , controladorPostProductos,
    controladorGetProductosId,controladorPutProductosId,
    controladorDeleteProductosId,controladorGetAccesosIn,
    controladorGetAccesosOut

    } = require("../controllers/controladorApiProductos");

const routerApiProductos = express.Router();

routerApiProductos.get('/',controladorGetProductos);
routerApiProductos.get('/accesosin',controladorGetAccesosIn);
routerApiProductos.get('/accesosout',controladorGetAccesosOut);
routerApiProductos.get('/:id',controladorGetProductosId);
routerApiProductos.post('/',controladorPostProductos);
routerApiProductos.put('/:id',controladorPutProductosId);
routerApiProductos.delete('/:id',controladorDeleteProductosId);

exports.routerApiProductos = routerApiProductos;