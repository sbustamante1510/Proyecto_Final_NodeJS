// const express = require('express');
import express from 'express';
import { routerApiProductos } from './routers/routerApiProductos.js';
// import {routerApiCarrito} from './routers/routerApiCarrito.js';
// import {MongoClient} from 'mongodb'

// const mongoClient = new MongoClient('mongodb://root:mongopassword@localhost?authSource=admin');
// await mongoClient.connect();

const servidor = express();

//middleware
servidor.use(express.json());
servidor.use(express.urlencoded({extended: true}));
servidor.use('/',express.static('public'))

//rutas
servidor.use('/api/productos',routerApiProductos);
//servidor.use('/api/carrito',routerApiCarrito);

const server = servidor.listen(8080, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});
server.on("error", error => console.log(`Error en servidor ${error}`));
