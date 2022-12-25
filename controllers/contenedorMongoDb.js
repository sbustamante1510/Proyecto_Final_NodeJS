import { MongoClient } from 'mongodb'

const mongoClient = new MongoClient('mongodb://localhost');
await mongoClient.connect();
const dbProducto = mongoClient.db('coderhouse').collection('productos')

export class ContenedorMongoDb{

    async guardar(producto){
        await dbProducto.insertOne(producto);
    }

    async recuperar(){
        return await dbProducto.find().toArray();
    }

}