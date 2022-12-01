const { randomUUID} = require('crypto');

const Carritos = [];

const controladorPostCarrito = (req,res) => {
    const carritoNuevo = {};
    carritoNuevo.id = randomUUID();
    carritoNuevo.timestamp = new Date().toLocaleString();
    carritoNuevo.productos = [];
    Carritos.push(carritoNuevo);
    res.status(201);
    res.json(carritoNuevo);
}


const controladorDeleteCarritoId = (req,res) => {
    const indiceCarrito = Carritos.findIndex(e => e.id === req.params.id);
    if(indiceCarrito === -1){
        res.status(404);
        res.json({error : "carrito no encontrado"});
    }
    else{
        const borrado = Carritos.splice(indiceCarrito,1)
        res.json(borrado[0])
    }
}


const controladorGetCarritoId = (req,res) => {
    const buscarProducto = Carritos.find( e => e.id === req.params.id)
    if(!buscarProducto){
        res.status(404);
        res.json({error : "producto no encontrado"});
    }
    else{
        res.json(buscarProducto);
    }
}


const controladorPostCarritoId = (req,res) => {
    const indiceCarrito = Carritos.findIndex(e => e.id === req.params.id);

    if(indiceCarrito === -1){
        res.status(404);
        res.json({error : "carrito no encontrado"});
    }
    else{
        const contenidoCarrito = req.body;
        Carritos[indiceCarrito].productos.push(contenidoCarrito);
        res.status(201);
        res.json(Carritos[indiceCarrito]);
    }
}


const controladorDeleteCarritoIdProducto = (req,res) => {
    const indiceCarrito = Carritos.findIndex(e => e.id === req.params.id);
    if(indiceCarrito === -1){
        res.status(404);
        res.json({error : "carrito no encontrado"});
    }
    else{
        const indiceProducto = Carritos[indiceCarrito].productos.findIndex(e => e.id === req.params.id_prod);
        if(indiceCarrito === -1){
            res.status(404);
            res.json({error : "producto no encontrado"});
        }
        else{
            const borrado = Carritos[indiceCarrito].productos.splice(indiceProducto,1);
            res.json(borrado[0])
        }
    }
    console.log(req.params)
}


exports.controladorPostCarrito = controladorPostCarrito;
exports.controladorGetCarritoId = controladorGetCarritoId;
exports.controladorPostCarritoId = controladorPostCarritoId;
exports.controladorDeleteCarritoId = controladorDeleteCarritoId;
exports.controladorDeleteCarritoIdProducto = controladorDeleteCarritoIdProducto