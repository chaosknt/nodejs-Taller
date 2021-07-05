import {createCUAddSubscriptor} from '../../subscriptors/business/Factory_Subscriptors.js'
import {createCUDeleteSubscriptor} from '../../subscriptors/business/Factory_Subscriptors.js'
import { createCUNotify } from '../../subscriptors/business/Factory_Subscriptors.js'
import {creaCUProductos} from '../../productos/business/Factory_CUProductos.js'

function createApiCatalogo(){

    const useCase_subscribe = createCUAddSubscriptor();
    const useCase_unsubscribe = createCUDeleteSubscriptor();
    const useCase_notify = createCUNotify();
    const useCase_productos = creaCUProductos();
    
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
        getProductoByCodigo: async (codigo) => {
            return await useCase_productos.getProductoByCodigo( codigo ); 
        },
        getAllProductos: async () => {
            return await useCase_productos.getAllProductos(); 
        },
        addProducto: async (Producto, Imagen) => {
            return await useCase_productos.addProducto( Producto, Imagen ); 
        },
        getProducto: async (id) => {
            return await useCase_productos.getProducto( id ); 
        },
        updateProducto: async (Producto, Imagen) => {
            return await useCase_productos.updateProducto( Producto, Imagen ); 
        },
        deleteProducto: async (id) => {
            return await useCase_productos.deleteProducto( id ); 
        },
        closeProductos: async () => {
            return await useCase_productos.close(); 
        },
    }
}

export default createApiCatalogo;