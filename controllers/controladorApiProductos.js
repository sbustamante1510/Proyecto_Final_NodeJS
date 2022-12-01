const { randomUUID} = require('crypto');

const productos = [];
let accesosAdmin = false;

const controladorGetAccesosIn = (req, res) => {
    accesosAdmin = true;
    res.json({mensaje : "Se dio el acceso como administrador"});
};


const controladorGetAccesosOut = (req, res) => {
    accesosAdmin = false;
    res.json({mensaje : "Se quito el acceso como administrador"});
};


const controladorGetProductos = (req, res) => {
    res.json(productos);
};


const controladorGetProductosId = (req,res) => {
    const buscarProducto = productos.find( e => e.id === req.params.id)

    if(!buscarProducto){
        res.status(404);
        res.json({error : "producto no encontrado"});
    }
    else{
        res.json(buscarProducto);
    }
}


const controladorPostProductos = (req,res) => {

    if(accesosAdmin){
        const productoNuevo = req.body;
        productoNuevo.id = randomUUID();
        productoNuevo.timestamp = new Date().toLocaleString();
        productos.push(productoNuevo);
        res.status(201);
        res.json(productoNuevo);
    }
    else{
        res.status(404);
        res.json({error : "Metodo no autorizado"});
    }
}


const controladorPutProductosId = (req,res) => {

    if(accesosAdmin){
        const indiceProducto = productos.findIndex(e => e.id === req.params.id);
        if(indiceProducto === -1){
            res.status(404);
            res.json({error : "producto no encontrado"});
        }
        else{
            productos[indiceProducto] = req.body;
            res.json(req.body)
        }
    }
    else{
        res.status(404);
        res.json({error : "Metodo no autorizado"});
    }
}


const controladorDeleteProductosId = (req,res) => {

    if(accesosAdmin){
        const indiceProducto = productos.findIndex(e => e.id === req.params.id);
        if(indiceProducto === -1){
            res.status(404);
            res.json({error : "producto no encontrado"});
        }
        else{
            const borrado = productos.splice(indiceProducto,1)
            res.json(borrado[0])
        }
    }
    else{
        res.status(404);
        res.json({error : "Metodo no autorizado"});
    }
}

exports.controladorGetAccesosIn = controladorGetAccesosIn;
exports.controladorGetAccesosOut = controladorGetAccesosOut;
exports.controladorGetProductos = controladorGetProductos;
exports.controladorPostProductos = controladorPostProductos;
exports.controladorGetProductosId = controladorGetProductosId;
exports.controladorPutProductosId = controladorPutProductosId;
exports.controladorDeleteProductosId = controladorDeleteProductosId;