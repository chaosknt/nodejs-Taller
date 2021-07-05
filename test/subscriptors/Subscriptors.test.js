import assert from 'assert'
import { createCUAddSubscriptor } from '../../src/subscriptors/business/Factory_Subscriptors.js'
import { createCUDeleteSubscriptor } from '../../src/subscriptors/business/Factory_Subscriptors.js'
import { createCUNotify } from '../../src/subscriptors/business/Factory_Subscriptors.js'

const useCase_subscribe = createCUAddSubscriptor();
const useCase_unsuscribe = createCUDeleteSubscriptor();
const useCase_notify = createCUNotify();

const emailUnico = 'chaosknt333@gmail.com'
const emailRepetido = 'chaosknt@gmail.com';
const emailIncorrecto = 'chaoskntgmail.com'

describe('Casos de uso Subscribrse, Desuscribirse y notificar', () => {

    describe('Al subscribirse:', () => {
        it('si el email no fue agregado sale todo bien', async  () => {

            await useCase_subscribe.subscribe({email:emailUnico})     

         })
        it('si el email ya fue agregado lanza un error', async  () => {
           assert.rejects( async () => {
                 await useCase_subscribe.subscribe({email:emailRepetido})
            }, () => {                
                return true
            })
        })
        it('si el email es incorrecto lanza un error', async  () => {
            assert.rejects( async () => {
                  await useCase_unsuscribe.subscribe({email:emailIncorrecto})
             }, () => {                
                 return true
             })
         })
    })

    describe('Al desuscribirse:', () => {
        it('si el email existe sale todo bien', async  () => {

            await useCase_unsuscribe.unsubscribe({email:emailRepetido})     
            
         })
        it('si el email no existe lanza un error', async  () => {
           assert.rejects( async () => {
                 await useCase_unsuscribe.unsubscribe({email:emailRepetido})
            }, () => {                
                return true
            })
        })
        it('si el email es incorrecto lanza un error', async  () => {
            assert.rejects( async () => {
                  await useCase_unsuscribe.unsubscribe({email:emailIncorrecto})
             }, () => {                
                 return true
             })
         })
    })

    describe('Al notificar:', () => {

        it('Si el objeto esta completo sale bien', async  () => {

            await useCase_notify.notify( {subject:'mocha test', htmlMsg:'vacio'} );
            
         })

         it('El subject esta vacio: lanza error', async  () => {
            assert.rejects( async () => {
                await useCase_notify.notify( {subject:'', htmlMsg:'vacio'} );
             }, () => {                
                 return true
             })
         })

         it('el htmlMsg esta vacio: lanza error', async  () => {
            assert.rejects( async () => {
                await useCase_notify.notify( {subject:'',htmlMsg:''} );
             }, () => {                
                 return true
             })
         })

    })

})
