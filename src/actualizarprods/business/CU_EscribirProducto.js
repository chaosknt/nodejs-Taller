import fs from 'fs';

class CU_EscribirProducto {
    createDate() {
        let mils = Date.now();
        let date = new Date(mils);
        return date.toISOString().slice(0, 19).replace(/:/g, "-");
    }

    async writeAllResultsToFile(data) {
        let content = JSON.stringify(data);
        let filename = this.createDate();
        return fs.writeFile(`./src/actualizarprods/files/output/${filename}.json`, content, {flag: 'a+'}, err => {
            if (err) throw err;
        });
    }

    writeFile(content) {
        content = JSON.stringify(content);
        let filename = this.createDate();
        fs.writeFile(`./src/actualizarprods/files/output/${filename}.json`, content, {flag: 'a+'}, err => {
            if (err) console.error(err)
        })
    }

}

export default CU_EscribirProducto;