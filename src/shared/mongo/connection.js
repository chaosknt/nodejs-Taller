import mongodb from 'mongodb'
import { getCnxStr } from "../../config.js";

let mongoclient = mongodb.MongoClient;

// TODO utilizar varibales de entorno
const uri =  getCnxStr(); // "mongodb+srv://admin:pepe1234@cluster0.iive0.mongodb.net/Productos?retryWrites=true&w=majority";

const client = new mongoclient(uri, {useUnifiedTopology: true});

let instance = null;

async function getConnection(){
    if(instance == null){
        try {
            instance = await client.connect();            
        } catch (err) {
            console.log(err.message);
            throw new Error('problemas al conectarse con mongo');
        }
    }
    return instance;
}

export {getConnection};





