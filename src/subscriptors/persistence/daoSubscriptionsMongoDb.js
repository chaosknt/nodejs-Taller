import { crearErrorDeBaseDeDatos } from "../../shared/error/subscriptorErrors/ErrorBaseDeDatos.js";
import { getCnxStr } from "../../config.js";
import mongodb from 'mongodb'

let mongoclient = mongodb.MongoClient;
//const uri = "mongodb+srv://admin:admin@branalanacluster.rjrre.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const uri = getCnxStr();
const client = new mongoclient(uri, {useUnifiedTopology: true});
await client.connect();
const database = client.db('productos');
const subs = database.collection('suscriptores');
const dbClientes = subs;

function daoSubscriptionsMongoDb() {

    return {
       add : async ( newMail ) => {
             
            try {                
                return await dbClientes.insertOne(newMail);
                
            } catch (error) {
                
                throw crearErrorDeBaseDeDatos(error.message)
            }
        },
        delete: async ( subsEmail ) => {                          

            try {
                return await dbClientes.deleteOne({email: subsEmail}); 
                
            } catch (error) {
                throw crearErrorDeBaseDeDatos(error.message)
            }
        },
        get: async ( subsEmail ) => {
            let r
            try {                
                r = await dbClientes.findOne(subsEmail);                              
                delete r._id;
               
            } catch (error) {
                
                throw crearErrorDeBaseDeDatos(error.message)

            }finally{
                return r || { email: '' }
            }
        },
        getAll: async () => {

            try {
                
                return  await dbClientes.find().toArray();
                 
            } catch (error) {
                
                throw crearErrorDeBaseDeDatos(error.message)
            }
        },
        close: async () => {
            await client.close()
        }
    }
  }
  
  export { daoSubscriptionsMongoDb }
  