import { crearServidor } from './shared/server/Server.js'
import crearApiCatalogo from './shared/fachadaCatalogo/apiCatalogo.js'
import { getPort } from './config.js'
import axios from 'axios'
const apiCatalogo = crearApiCatalogo();

const servidor = crearServidor( {apiCatalogo} )

const port = getPort();

//#region  Pruebas Caso de uso Subscriptor
//
//const { data:adding } = await axios.post(`http://localhost:${port}/api/subscribe`, { email: 'mariano2@oxxon-cd.com' })
//console.log(adding)
//const { data } = await axios.post(`http://localhost:${port}/api/unsubscribe`, { email: 'chaoskntt@gmail.com' })

//const { data }  =  await axios.post(`http://localhost:${port}/api/subscribe`, { email: 'prueba@prueba.com' })

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
        //const { data }  =  await axios.get(`http://localhost:${port}/api/actualizar/name/joyce`)
        //console.log(data)    
        const { data } = await axios.post(`http://localhost:${port}/api/subscribe`, { email: 'chaosknt@gmail.com' })
       
        //const { data } = await axios.post(`http://localhost:${port}/api/unsubscribe`, { email: 'chaosknt@gmail.com' })
        console.log(data)

    } catch (error) {
        console.log(error)
        await stopServer();
    }
}

main()