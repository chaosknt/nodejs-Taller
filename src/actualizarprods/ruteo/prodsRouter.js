import express from "express";
import createDaoProducts from "../persistence/createDaoProducts.js";
import CU_EscribirProducto from "../business/CU_EscribirProducto.js";
import CU_ActualizarProductos from "../business/CU_ActualizarProductos.js";

const router = express.Router();
const dao = new createDaoProducts();

router.get('/', (req, res, next) => {
    dao.getProducts().then(data => {
        try {
            new CU_EscribirProducto().writeAllResults(data).then(value => {
                res.status(200).send("Toda la colección exportada en un archivo correctamente");
            });
        } catch (e) {
            res.status(500).send("Error de servidor. Reintente operación");
        }
    })
})


router.get('/name/:name', (req, res, next) => {

    dao.getProduct(req.params.name).then(cursor => {
        let cu_escribir = new CU_EscribirProducto();
        cursor.forEach(el => {
            cu_escribir.writeFile(el);
            res.json(el);
        })
    })
});

router.put('/update/:file', async (req, res, next) => {
    console.log("put call");
    let record = await new CU_ActualizarProductos().generateRecord(`./src/actualizarprods/files/input/${req.params.file}.json`);
    dao.updateRecordsFromFile(record).then(value => {
        res.status(200).send("Archivo actualizado correctamente.");
    });

})


router.post('/', async (request, response, next) => {

});


export default router