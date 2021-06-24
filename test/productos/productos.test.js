import assert from 'assert'
import { crearServidor } from '../../src/shared/server/Server.js'
import FormData from "form-data"
import axios from 'axios'
import fs from 'fs'
import { json } from 'express'
import factoryProductos from '../../src/productos/business/utils/factoryProductos.js'
import {getConnection} from '../../src/shared/mongo/connection.js'

const dir = 'entrada-salida/archivos'   
const port = 8080;
let conn
let apiProd
let servidor

    conn = await getConnection();
    apiProd = factoryProductos.crearFactory_Productos(conn)
    servidor = crearServidor({api: apiProd})
    await servidor.conectar(port)

const prod1 = {
    precio: '20.34',
    nombre: 'jabon federal',
    codigo: 'jab00001',
    cantidad: '100'
}

describe('Modulo de productos', () => {

        describe('Prueba de ABM', () => {

        it('si se pasan todos los datos bien sale todo bien', async  () => {
            var alta = new FormData();
            alta.append('sampleFile', fs.createReadStream(dir + '/mkEyv1.jpg'));
            alta.append('producto', JSON.stringify(prod1));
            await axios.post(`http://localhost:8080/api/productos`,alta, {
                headers: alta.getHeaders()
                })
                .then(response => {
                    console.log('1 ' +  response.status)
                    console.log('alta correcta del producto: ' +  JSON.stringify(response.data))
                })
                .catch (e => {
                    console.log('2 ' +  e.message);
                    console.log('3 ' +  e.response.data);
                    }
                );     
        })

        it('Consulta de todos los productos Ok', async  () => {
            await axios.get(`http://localhost:8080/api/productos/`)
            .then(response => {
                console.log(response.status)
                console.log(response.data)
            })
            .catch (e => {
                console.log(e.message);
                console.log(e.response.data);
            }
            );
         })

    let cod1

        it('consulta con un codigo valido', async  () => {
            await axios.get(`http://localhost:8080/api/productos/?codigo=jab00001`)
            .then(response => {
                console.log(response.status)
                console.log('encontro el id' + response.data)
                cod1 = response.data
            })
            .catch (e => {
                console.log(e.message);
                console.log(e.response.data);
            }
            );
         })

    let prod2

        it('consulta por ID', async  () => {
                await axios.get(`http://localhost:8080/api/productos/` + cod1)
                .then(response => {
                    console.log(response.status)
                    console.log('consulta de producto: ' + JSON.stringify(response.data))
                    prod2 = response.data
                })
                .catch (e => {
                    console.log(e.message);
                    console.log(e.response.data);
                }
                );
         })

        it('Modificacion de producto existente', async  () => {
            prod2.precio = '44.22'
            prod2.nombre = 'jabon lux'
            delete prod2.foto;
            var update = new FormData();
            update.append('imagen', fs.createReadStream(dir + '/mkEyv1.jpg'));
            update.append('producto', JSON.stringify(prod2));
        
            await axios.put(`http://localhost:8080/api/productos/` + prod2._id, update, {
                headers: update.getHeaders()
             })
            .then(response => {
                console.log('1 ' +  response.status)
                console.log('modificacion correcta del producto: ' +  prod2._id)
            })
            .catch (e => {
                console.log('2 ' +  e.message);
                console.log('3 ' +  e.response.data);
                }
            );
         })

         let prod3

        it('consulta de la modificacion', async  () => {
            await axios.get(`http://localhost:8080/api/productos/` + prod2._id)
            .then(response => {
                console.log(response.status)
                console.log('consulta de producto: ' + JSON.stringify(response.data))
                prod3 = response.data
                delete prod3.foto
            })
            .catch (e => {
                console.log(e.message);
                console.log(e.response.data);
            }
            );
            assert.deepStrictEqual(prod2, prod3)
         })

        it('Baja Ok', async  () => {
            await axios.delete(`http://localhost:8080/api/productos/` + cod1)
            .then(response => {
                console.log( response.status)
                console.log('baja ok id:' + cod1)
            })
            .catch (e => {
                console.log('7 ' +  e.message);
                console.log('8 ' +  e.response.data);
            }
            );
        })
        it('Cierre de proceso', async  () => {
            await conn.close();
            await servidor.desconectar();
        })
    })
})





