import joi from 'joi';
import {crearErrorDatosInvalidos} from '../errors/ErrorDatosInvalidos.js'
import {crearErrorProductoNoEncontrado} from '../errors/ErrorProductoNoEncontrado.js'
import {setCloudinaryConfig, fileUpload} from '../../../shared/cloudinary/cloudinary.js'
import {config} from '../../../shared/cloudinary/config.js'
import fs from 'fs'

function CrearProcesosProductos(dao) {

    setCloudinaryConfig(config);

    return {

        validarAlta: async(Producto) => {
                    const schemaPost = joi.object({
                    precio: joi.number().required(),
                    nombre: joi.string().pattern(new RegExp("^[A-Za-z0-9\\s]{3,30}$")).required(),
                    codigo: joi.string().pattern(new RegExp("^[A-Za-z0-9]{8}$")).required(),
                    cantidad: joi.number().required()
                });
                const result = schemaPost.validate(Producto);
                if (result.error) {
                throw crearErrorDatosInvalidos(result.error.details[0].message)
                }
        },
        
        validarModificacion: async(Producto) => {
                const schemaUpdate = joi.object({
                    precio: joi.number(),
                    nombre: joi.string().pattern(new RegExp("^[A-Za-z0-9\\s]{3,30}$")),
                    codigo: joi.string().pattern(new RegExp("^[A-Za-z0-9]{8}$")),
                    cantidad: joi.number(),
                    _id: joi.required()
                  });
                const result = schemaUpdate.validate(Producto);
                if (result.error) {
                    throw crearErrorDatosInvalidos(result.error.details[0].message)
                }
        },

        buscarProductoConError: async (id) => {
            const Encontrado = await dao.getProducto(id);
            if (!Encontrado) {
                throw crearErrorProductoNoEncontrado('No se encontro el producto')
            } else {
                return Encontrado
            }
        },

        subirACloudinary: async(imagen) => {

            try {
                let uriImagen
                if (imagen) {
                    const cloudRes = fileUpload(imagen);
                    await cloudRes.then(function (image) {uriImagen = image.url})
                }
                return uriImagen;
            } finally {
                try {
                    fs.unlinkSync(imagen)
                } catch (error) {
                    console.log('%%%%error al borrar archivo%%%%%%% ' + imagen + ' ' + error.message)
                } 
            }
        }
    }
}

export {CrearProcesosProductos}