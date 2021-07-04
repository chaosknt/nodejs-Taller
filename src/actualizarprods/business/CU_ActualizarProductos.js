import {promises as fs} from "fs";

class CU_ActualizarProductos{
    async updateRecordsFromFile(file){
        let record = await this.generateRecord(file);
        return JSON.parse(record);
    }

    async generateRecord(file){
        let record = await fs.readFile(file, "utf-8");
        console.dir(record);
        return record;
    }
}


export default CU_ActualizarProductos;