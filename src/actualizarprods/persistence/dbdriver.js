import {default as mongodb} from 'mongodb';

const uri = "mongodb+srv://admin:admin@branalanacluster.rjrre.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
let MongoClient = mongodb.MongoClient;
const client = new MongoClient.connect(uri,{ useUnifiedTopology: true });

export {
    client
}