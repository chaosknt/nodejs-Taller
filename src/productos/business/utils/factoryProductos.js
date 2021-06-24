import {crearApiProductos} from '../CUProductos.js'
import {crearDaoProductos} from '../../persistence/daoProductosMongo.js'
import { CrearProcesosProductos } from '../../business/utils/procesosProductos.js';
import {CrearProcesosArchivos} from '../utils/procesosArchivos.js'

function crearFactory_Productos(conn) {
    const dao = crearDaoProductos(conn)    
    const proPro = CrearProcesosProductos(dao)
    const proArc = CrearProcesosArchivos() 
    const ApiProductos = new crearApiProductos(dao, proPro, proArc) 
    return ApiProductos
  }
  
  export default {
    crearFactory_Productos
  }