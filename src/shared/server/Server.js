import express from 'express'

import fileUpload from 'express-fileupload'
import {crearRouterProductos} from '../../productos/routes/productosRoutes.js'

//subscriptor
import crearAddSubscriptor from '../../subscriptors/route/SubscribeRouter.js'
import crearDeleteSubscriptor from '../../subscriptors/route/UnsubscribeRouter.js'
import crearNotifySubscriptor from '../../subscriptors/route/NotifySubscriptors.js'


function crearServidor({ apiCatalogo } ){

    const app = express()
    app.use(express.json());
    app.use(fileUpload());

    app.use('/api/productos', crearRouterProductos(apiCatalogo));

    //subscriptor
    app.use('/api/subscribe', crearAddSubscriptor(apiCatalogo))
    app.use('/api/unsubscribe', crearDeleteSubscriptor(apiCatalogo))
    app.use('/api/notify', crearNotifySubscriptor(apiCatalogo))


    let server = null;

    return {
        conectar: (port) => {
          return new Promise((resolve, reject) => {
            if (server) {
              reject(new Error('servidor ya conectado'))
            } else {
              server = app.listen(port, () => {
                console.log(`todo bien, conectado en puerto ${server.address().port}`)
                resolve()
              })
              server.on('error', (err) => {
                reject(err)
              })
            }
          })
        },
        desconectar: () => {
          return new Promise((resolve, reject) => {
            server.close((err) => {
              if (err) {
                reject(err)
              } else {
                server = null
                resolve()
              }
            })
          })
        }
      }
}

export { crearServidor }