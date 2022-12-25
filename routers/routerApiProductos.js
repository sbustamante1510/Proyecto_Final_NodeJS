import express from 'express';
import { controladorGetProductos , controladorPostProductos,
    controladorGetProductosId,controladorPutProductosId,
    controladorDeleteProductosId,controladorGetAccesosIn,
    controladorGetAccesosOut }  from '../controllers/controladorApiProductos.js';

const routerApiProductos = express.Router();

routerApiProductos.get('/',controladorGetProductos);
//routerApiProductos.get('/accesosin',controladorGetAccesosIn);
//routerApiProductos.get('/accesosout',controladorGetAccesosOut);
routerApiProductos.get('/:id',controladorGetProductosId);
routerApiProductos.post('/',controladorPostProductos);
routerApiProductos.put('/:id',controladorPutProductosId);
routerApiProductos.delete('/:id',controladorDeleteProductosId);

// exports.routerApiProductos = routerApiProductos;
export{routerApiProductos}