import {promises as fs} from "fs";
import Joi from 'joi';
import {response} from "express";

class CU_ActualizarProductos {
    async updateRecordsFromFile(file) {
        let record = await this.generateRecord(file);
        return JSON.parse(record);
    }

    async generateRecord(file) {
        let record = await fs.readFile(file, "utf-8");
        let result = this.validateRecord(record);
        console.dir(result.validation)
        for (const resultKey in result.validation) {
            if(result.validation[resultKey].hasOwnProperty("error")){
                throw new Error(`El JSON ingresado tiene un formato incorrecto: | ${result.validation[resultKey].error.message}`);
            }
        }
        return result.record;
    }

    validateRecord(record) {
        record = JSON.parse(record);
        const schema = Joi.object({
            index: Joi.number()
                .integer(),
            name: Joi.string()
                .alphanum(),
            price: Joi.number()
        })
        let validation = {validation :[], record : record};
        for (let i = 0; i < record.length; i++) {
            let result = schema.validate(record[i]);
            validation.validation.push(result);
        }
        return validation;
    }
}


export default CU_ActualizarProductos;