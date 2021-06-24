function crearCUProductos(dao, procesosProductos, procesosArchivos) {

    return {

        getProductoByCodigo: async (codigo) => {
            
                return await dao.getProductoByCodigo(codigo);
        },

        getAllProductos: async () => {
            
                return await dao.getAllProductos();
        },

        addProducto: async(Producto, Imagen) => {
                
                await procesosProductos.validarAlta(Producto)
                const path = 'entrada-salida/uploads'
                let imagen = await procesosArchivos.subirElPrimero(Imagen, path)
                let uriImagen 
                await procesosProductos.subirACloudinary(imagen).then(uri => uriImagen = uri)
                const result = await dao.addProducto(Producto, uriImagen);
                return result;
        },

        getProducto: async(id) => {
                const Producto = await dao.getProducto(id);
                return Producto
        },

        updateProducto: async(Producto, Imagen) => {

            await procesosProductos.validarModificacion(Producto)
            const path = 'entrada-salida/uploads'
            let imagen = await procesosArchivos.subirElPrimero(Imagen, path)
            let uriImagen 
            await procesosProductos.subirACloudinary(imagen).then(uri => uriImagen = uri)
            procesosProductos.buscarProductoConError(Producto._id)
            const result = await dao.updateProducto(Producto,uriImagen);
            return result;

        },

        deleteProducto: async(id) => {
            await procesosProductos.buscarProductoConError(id)
            const result = await dao.deleteProducto(id);
            return result.ops;
        },

        close: async() => {
            const res = await dao.close();
            return res
        }
    }
}

export {crearCUProductos}

  
  
