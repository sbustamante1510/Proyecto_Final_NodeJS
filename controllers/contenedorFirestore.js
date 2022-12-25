import admin from 'firebase-admin'
import fs from 'fs'


const serviceAccount = JSON.parse(await fs.promises.readFile('./config/nodejs-coderhouse-firebase-adminsdk-lk2ii-7e649cdc1d.json','utf8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const firestoreDatabase = admin.firestore();
const collection = firestoreDatabase.collection('productos');

const asObj = (ref) => {
    return {id: ref.id, ...ref.data()}
}

export class ContenedorFirestore{

    async guardar(producto){
        await collection.add(producto);

    }

    async recuperar(){
        const snapshot = await collection.get();
        const result = [];
        snapshot.forEach(doc => {
            result.push(asObj(doc))
        })
        return result;       
    }

}