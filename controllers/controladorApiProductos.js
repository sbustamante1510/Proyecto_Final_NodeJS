import { randomUUID} from 'crypto';
import { contenedorProductos } from './contenedor.js'

const productos = [];
let accesosAdmin = false;

const soloTieneLetras = (cadena) => {
    const letras = 'abcdefghijklmnopqrstuvwxyz';
    return cadena.split('').every(c => letras.includes(c.toLowerCase()));
}

const  validarProducto = (datos) => {
    if(!datos.title) throw new Error('title es un campo requerido');
    if(typeof datos.title !== 'string') throw new Error('title debe ser una cadena de caracteres');
    if(!soloTieneLetras(datos.title)) throw new Error('title solo puede contener letras');
    if(!datos.price) throw new Error('price es un campo requerido');
    if(typeof datos.price !== 'number' || !Number.isInteger(datos.price)) throw new Error('la edad debe ser un numero entero');
    return (datos)
}


class ModelProducto{


    async crearProducto(datos){
        const datosValidados = validarProducto(datos);
        await contenedorProductos.guardar(datosValidados);
        return datosValidados;
    }

    async buscarProducto(){
        // return await dbProducto.find().toArray();
        return await contenedorProductos.recuperar();
    }
}

const modeloProducto = new ModelProducto();


export const controladorGetAccesosIn = (req, res) => {
    accesosAdmin = true;
    res.json({mensaje : "Se dio el acceso como administrador"});
};


export const controladorGetAccesosOut = (req, res) => {
    accesosAdmin = false;
    res.json({mensaje : "Se quito el acceso como administrador"});
};


export const controladorGetProductos = async (req, res) => {
    const productos =  await modeloProducto.buscarProducto();
    // res.json({error : "Gaa"});
    res.json(productos);
};


export const controladorGetProductosId = (req,res) => {
    const buscarProducto = productos.find( e => e.id === req.params.id)

    if(!buscarProducto){
        res.status(404);
        res.json({error : "producto no encontrado"});
    }
    else{
        res.json(buscarProducto);
    }
}


export const controladorPostProductos = async (req,res) => {

    // if(accesosAdmin){

        const productoNuevo = req.body;
        // productoNuevo.id = randomUUID();
        // productoNuevo.timestamp = new Date().toLocaleString();
        // productos.push(productoNuevo);
        // res.status(201);
        try{
            const producto = await modeloProducto.crearProducto(productoNuevo);
            res.json(producto)
        } catch(error){
            res.json({errorMsg : error.message});
        }



    // }
    // else{
    //     res.status(404);
    //     res.json({error : "Metodo no autorizado"});
    // }
}


export const controladorPutProductosId = (req,res) => {

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


export const controladorDeleteProductosId = (req,res) => {

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

// exports.controladorGetAccesosIn = controladorGetAccesosIn;
// exports.controladorGetAccesosOut = controladorGetAccesosOut;
// exports.controladorGetProductos = controladorGetProductos;
// exports.controladorPostProductos = controladorPostProductos;
// exports.controladorGetProductosId = controladorGetProductosId;
// exports.controladorPutProductosId = controladorPutProductosId;
// exports.controladorDeleteProductosId = controladorDeleteProductosId;