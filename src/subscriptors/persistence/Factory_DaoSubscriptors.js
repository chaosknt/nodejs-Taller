import { getMode } from '../../config.js'

let daoSubs

switch (getMode()) {
  case 'PROD':
    /*const { crearMongoClient } = await import('./mongo/mongoClient.js')
    const { daoSubscriptionsMongoDb } = await import('./mongo/daoSubscriptionsMongoDb.js')      
    const mongoClient = await crearMongoClient()
    const db = mongoClient.db('productos');
    const daoClientesMongoDb = daoSubscriptionsMongoDb(db)*/    
   
    const { daoSubscriptionsMongoDb } = await import('./daoSubscriptionsMongoDb.js')    
    const daoClientesMongo = daoSubscriptionsMongoDb()
    daoSubs = daoClientesMongo
    break;
  default:
    const { createDaoSubscriptions } = await import('./daoSubscriptionsCache.js')    
    const daoClientesCache = createDaoSubscriptions()
    daoSubs = daoClientesCache
    break;
}

export function getDaoSubscriptors() {
  return daoSubs
}
