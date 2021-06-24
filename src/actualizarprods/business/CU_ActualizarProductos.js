import {promises as fs} from "fs";

class CU_ActualizarProductos{
    async updateRecordsFromFile(file){
        let record = await this.generateRecord(file);
        return JSON.parse(record);
    }

    async generateRecord(file){
        return await fs.readFile(file, "utf-8");
    }
}


export default CU_ActualizarProductos;