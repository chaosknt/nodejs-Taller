import mongodb from 'mongodb'
import {crearErrorDeBaseDeDatos} from '../business/errors/ErrorBaseDeDatos.js'

function crearDaoProductos(connectiondb) {
    const db = 'Productos'
    const tableproductos = 'Productos'
    let objectId = mongodb.ObjectId;
    
    return {

        getAllProductos: async() => {
        try {
            const productos = await connectiondb.db(db)
                                .collection(tableproductos)
                                .find()
                                .toArray();
            return productos;
        } catch (error) {
            console.log(error.message);
            throw crearErrorDeBaseDeDatos(error.message)
          }
        },

        addProducto: async(Producto, Imagen) => {
        try {
            if (Imagen) {
              Producto.foto = Imagen;
            }
            const result = await connectiondb.db(db)
                                .collection(tableproductos)
                                .insertOne(Producto);
            return result;
        } catch (error) {
            console.log(error.message);
            throw crearErrorDeBaseDeDatos(error.message)
          }
        },

        getProducto: async(id) => {
        try {
            const producto = await connectiondb.db(db)
                                .collection(tableproductos)
                                .findOne({_id: new objectId(id)});  //ES PORQUE EL ID VIENE COMO STRING Y MONGO LO NECESITA COMO UN OBJETO ESPECIAL
            return producto;
        } catch (error) {
            console.log(error.message);
            throw crearErrorDeBaseDeDatos(error.message)
          }
        },

        updateProducto: async(Producto, Imagen) => {
        try {
            if (Imagen) Producto.foto = Imagen;
            const query = {_id: new objectId(Producto._id)};   //ES PORQUE EL ID VIENE COMO STRING Y MONGO LO NECESITA COMO UN OBJETO ESPECIAL
            const producto = Producto;
            delete producto._id;
            const newvalues = {$set:producto}
            const result = await connectiondb.db(db)
                                .collection(tableproductos)
                                .updateOne(query, newvalues);
            return result;  
        } catch (error) {
            console.log(error.message);
            throw crearErrorDeBaseDeDatos(error.message)
          }
        },

        deleteProducto: async(id) => {
        try {
            const result = await connectiondb.db(db)
                            .collection(tableproductos)
                            .deleteOne({_id: new objectId(id)});   //ES PORQUE EL ID VIENE COMO STRING Y MONGO LO NECESITA COMO UN OBJETO ESPECIAL
            return result;
        } catch (error) {
            console.log(error.message);
            throw crearErrorDeBaseDeDatos(error.message)
          }
        },

        getProductoByCodigo: async(codigo) => {
        try {
            const producto = await connectiondb.db(db)
                                .collection(tableproductos)
                                .findOne({codigo: codigo});
            return (producto) ? producto._id: null;
        } catch (error) {
            console.log(error.message);
            throw crearErrorDeBaseDeDatos(error.message)
          }
        },

        close: async() => {
          try {
              const res = await connectiondb.close()
              return (res) ? res: null;
          } catch (error) {
              console.log(error.message);
            }
        }
    }
}


export {crearDaoProductos};