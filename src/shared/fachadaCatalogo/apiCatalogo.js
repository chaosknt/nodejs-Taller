import {createCUAddSubscriptor} from '../../subscriptors/business/Factory_Subscriptors.js'
import {createCUDeleteSubscriptor} from '../../subscriptors/business/Factory_Subscriptors.js'
import { createCUNotify } from '../../subscriptors/business/Factory_Subscriptors.js'

function createApiCatalogo(){

    //#region Subscriptors
    const useCase_subscribe = createCUAddSubscriptor();
    const useCase_unsubscribe = createCUDeleteSubscriptor();
    const useCase_notify = createCUNotify();
    //#endregion
    
    return {
        subscribe: async ( email ) => {
            await  useCase_subscribe.subscribe( email );             
        },
        unsibscribe: async ( email ) => {
            await useCase_unsubscribe.unsubscribe(email);    
        },
        notify: async ( notification ) => {
            await useCase_notify.notify( notification );  
        },
        escribirProducto: async () => {

        },
        actualizarProducto: async () => {
            
        }
    }
}

export default createApiCatalogo;