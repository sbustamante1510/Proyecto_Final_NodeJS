import { ContenedorFirestore } from './contenedorFirestore.js';
import { ContenedorMongoDb } from './contenedorMongoDb.js'

let PERSISTENCIA = 'mongodb';
let contenedorProductos;

switch(PERSISTENCIA){
    case 'mongodb':
        contenedorProductos = new ContenedorMongoDb();
        break;
    case 'firestore':
        contenedorProductos = new ContenedorFirestore();
        break;
}

export { contenedorProductos }