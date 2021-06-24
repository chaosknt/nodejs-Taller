import {crearCUProductos} from './CUProductos.js'
import {CrearDaoProductos} from '../persistence/Factory_DaoProductosMongo.js'
import { CrearProcesosProductos } from './utils/procesosProductos.js';
import {CrearProcesosArchivos} from './utils/procesosArchivos.js'

function creaCUProductos() {
    const dao = CrearDaoProductos()    
    const proPro = CrearProcesosProductos(dao)
    const proArc = CrearProcesosArchivos() 
    const CUProductos = crearCUProductos(dao, proPro, proArc) 
    return CUProductos
  }
  
  export  {
    creaCUProductos
  }