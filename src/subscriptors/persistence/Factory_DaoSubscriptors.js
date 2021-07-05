import { getMode } from '../../config.js'

let daoSubs

switch (getMode()) {
  case 'PROD':
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
