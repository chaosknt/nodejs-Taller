import mongodb from 'mongodb'

let mongoclient = mongodb.MongoClient;

// TODO utilizar varibales de entorno
const uri = "mongodb+srv://admin:pepe1234@cluster0.iive0.mongodb.net/Productos?retryWrites=true&w=majority";

const client = new mongoclient(uri, {useUnifiedTopology: true});

let instance = null;

async function getConnection(){
    if(instance == null){
        try {
            instance = await client.connect();
            // console.log(instance)
        } catch (err) {
            console.log(err.message);
            throw new Error('problemas al conectarse con mongo');
        }
    }
    return instance;
}

export {getConnection};





