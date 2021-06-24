import express from 'express'
import { createCUNotify } from '../business/Factory_Subscriptors.js'

function crearNotifySubscriptor(apiCatalogo){

const router = express.Router();

router.post('/', async (req, res) => {

    try {
               
        await apiCatalogo.notify(req.body);              
        res.json({ rta: 'Realizado'});

    } catch (error) {      
        next(error)        
    }

})

router.use((err, req, res, next) => {
    res.status(404)
    res.json({ msg: err.message })
  })
  return router
  
}

export default crearNotifySubscriptor