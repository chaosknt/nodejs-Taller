import { getMode } from '../../config.js'


    const {getConnection} = await import ( '../../shared/mongo/connection.js')
    const { crearDaoProductos } = await import('./daoProductosMongo.js') 
    const conn = await getConnection();  
    const daoSubs = crearDaoProductos(conn)

export function CrearDaoProductos() {
  return daoSubs
}