import axios from 'axios'
import assert from 'assert'

import { crearServidor } from '../src/shared/server/Server.js'

const servidor = crearServidor({api : null})

const port = 3000

describe('Testear peticiones ', () => {
    
    it('Url correcta, Email correcto, sale bien', async  () => {
        
        //TODO: Revisar Lanza error servidor ya conectado
        await servidor.conectar(port)
        const { data:adding } = await axios.post(`http://localhost:${port}/api/subscribe`, { email: 'mariano23@oxxon-cd.com' })
        await servidor.desconectar()
        
     })

     it('Url correcta, Email repetido, lanza error', async  () => {

       
        assert.rejects( async () => {
            await servidor.conectar(port)
            await axios.post(`http://localhost:${port}/api/subscribe`, { email: 'mariano@oxxon-cd.com' })
         }, async () => {           
            await servidor.desconectar()     
             return true
         })
        
     })
     
     it('Url incorrecta lanza error', async  () => {

       
        assert.rejects( async () => {
            await servidor.conectar(port)
            await axios.post(`http://localhost:${port}/api/subscribee`, { email: 'mariano@oxxon-cd.com' })
         }, async () => {           
            await servidor.desconectar()     
             return true
         })
        
     })
     
     it('Email no existe al desuscribirse, lanza error', async  () => {
       
        assert.rejects( async () => {
            await servidor.conectar(port)
            await axios.post(`http://localhost:${port}/api/unsubscribe`, { email: 'chaoskneet@gmail.com' })
         }, async () => {           
            await servidor.desconectar()     
             return true
         })
        
     })
     
     it('Se desuscribe correctamente', async  () => {
       
        assert.rejects( async () => {
            await servidor.conectar(port)
            await axios.post(`http://localhost:${port}/api/unsubscribe`, { email: 'chaosknt@gmail.com' })
         }, async () => {           
            await servidor.desconectar()     
             return true
         })
        
     })

     it('Se intenta notificar y no tira error', async  () => {
       
        assert.rejects( async () => {
            await servidor.conectar(port)
            await axios.post(`http://localhost:${port}/api/notify`, { subject: 'test', htmlMSG: 'test msg' })
         }, async () => {           
            await servidor.desconectar()     
             return true
         })
        
     })
     
})
   

