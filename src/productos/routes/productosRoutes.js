import express from 'express'
import {auth} from '../../shared/server/auth.js'

function crearRouterProductos(apiProductos) {

  const productosRouter = express.Router();

  //CONSULTA SI ME VINO EL CÓDIGO, CONSULTO POR CODIGO, SINO CONSULTO TODOS
  productosRouter.get('/', auth, async function(req, res, next) {
    try {
      let Productos
      if (req.query.codigo) {
        Productos = await apiProductos.getProductoByCodigo(req.query.codigo);
      } else {
        Productos = await apiProductos.getAllProductos();
      }
      res.status(200).json(Productos);
    } catch (error) {
      console.log(error.message);
      res.status(500).send(error.message);
    }
  });

  //AGREGAR Producto
  productosRouter.post("/", auth, async (req, res) => {
    try{
      //console.log(req.files.sampleFile.data)
      const Producto = JSON.parse(req.body.producto)
      let result = await apiProductos.addProducto(Producto, req.files);
      res.status(200).send(result.ops);
    } catch (error) {
      console.log('4 ' + error.message);
      if (error.type == 'ERROR_DATOS_INVALIDOS') {
        res.status(400).send(error.message);
      } else {
        res.status(500).send(error.message);
      }
    }
  });

  //FIND POR ID
  productosRouter.get("/:id", auth, async (req, res) => {
    try {
      const Producto = await apiProductos.getProducto(req.params.id);
      if (Producto) {
        res.status(200).json(Producto);
      } else {
        res.status(404).send("Usuario no encontrado");
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).send(error.message);
    }
  });

  //UPDATE
  productosRouter.put("/:id", auth, async (req, res) => {
    try {
        const Producto = JSON.parse(req.body.producto)
        const result = await apiProductos.updateProducto(Producto, req.files);
        res.status(200).json(result.ops);
    } catch (error) {
      console.log('5 ' + error.message);
      if (error.type == 'ERROR_DATOS_INVALIDOS' || error.type == 'ERROR_PRODUCTO_NO_ENCONTRADO') {
        res.status(400).send(error.message);
      } else {
        res.status(500).send(error.message);
      }
    }
  });

  //DELETE
  productosRouter.delete("/:id", auth, async (req, res) => {
    try {
    const result = await apiProductos.deleteProducto(req.params.id);
    res.status(200).json('Baja Ok');
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
  });

  return productosRouter

};

export { crearRouterProductos}