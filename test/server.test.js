/*import axios from 'axios'
import assert from 'assert'

import { crearServidor } from '../src/shared/server/Server.js'

const servidor = crearServidor({api : null})

const port = 4001

describe('Testear peticiones ', async () => {

     it('Url correcta, Email repetido, lanza error', async  () => {
       
        assert.rejects( async () => {
            await servidor.conectar(port)
            await axios.post(`http://localhost:${port}/api/subscribe`, { email: 'mariano@oxxon-cd.com' })
         }, async () => {           
            await servidor.desconectar() 
             return true
         })
        
     })
    
})
   

*/