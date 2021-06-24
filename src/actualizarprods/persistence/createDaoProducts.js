import {client} from "./dbdriver.js";

class createDaoProducts {
    constructor() {
        this.collection = "prods";
        this.dbname = "productos";
        this.client = client;
    }

    async getProduct(id) {
        console.log("ID IS " + id);
        const collection = await this.getCollection();
        let query = {name: id};
        const result = await collection.find(query, {projection:{_id:0}});
        return result;
    }

    async updateRecordsFromFile(records) {
        records = JSON.parse(records);
        const collection = await this.getCollection();
        let bulk = collection.initializeOrderedBulkOp();
        for( var i = 0; i < records.length; i++){
            bulk.find({"index": records[i].index}).upsert(records[i]).replaceOne(records[i]);
        }
        bulk.execute((err,updateResult)=>{
            if (updateResult.result.ok !== 1) {
                console.log('Bulk Upsert Error');
            } else {
                console.log(`Inserted: ${updateResult.result.nUpserted} and Updated: ${updateResult.result.nModified}`);
            }
        })
    }

    async getProducts() {
        const collection = await this.getCollection();
        const result = await collection.find({}, {projection:{_id:0}}).toArray();
        return result;
    }

    async getCollection() {
        const cli = await this.client;
        const db = await cli.db(this.dbname);
        return await db.collection(this.collection);
    }
}

export default createDaoProducts