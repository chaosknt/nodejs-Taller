import axios from 'axios'
import { crearServidor } from './shared/server/Server.js'
import crearApiCatalogo from './shared/fachadaCatalogo/apiCatalogo.js'
import { getPort } from './config.js'

const apiCatalogo = crearApiCatalogo();

const servidor = crearServidor( {apiCatalogo} )

const port = getPort();

//#region  Pruebas Caso de uso Subscriptor
//const { data:adding } = await axios.post(`http://localhost:${port}/api/subscribe`, { email: 'mariano2@oxxon-cd.com' })

//const { data } = await axios.post(`http://localhost:${port}/api/unsubscribe`, { email: 'chaoskntt@gmail.com' })

//const { data }  =  await axios.post(`http://localhost:${port}/api/subscribe`, { email: 'mariano@oxxon-cd.com' })
//const { data }  =  await axios.post(`http://localhost:${port}/api/subscribe`, { email: 'prueba@prueba.com' })
//console.log(data)

//await servidor.desconectar();

//const { data:notify } = await axios.post(`http://localhost:${port}/api/notify`, { subject: 'test', htmlMSG: 'test msg' })

//#endregion

async function runServer(){

    await servidor.conectar(port)
}

async function stopServer(){

    await servidor.desconectar();
}

async function main(){
    try {
        await runServer();       
    } catch (error) {
        console.log(error)
        await stopServer();
    }
}

main()