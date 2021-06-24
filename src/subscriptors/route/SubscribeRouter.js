import express from 'express'

function crearAddSubscriptor(apiCatalogo){

const router = express.Router();

router.post('/', async (req, res, next) => {
    
    try {        
        await apiCatalogo.subscribe(req.body);      
        res.json({ rta: 'Agregado'});        
    } catch (error) {   
       next(error)           
    }
})

router.use((err, req, res, next) => {
    if (err.type == 'ERR_EMAIL_FOUND') {
      res.status(404)
    } else {
      res.status(500)
    }
    res.json({ msg: err.message })
  })
  return router
}

export default crearAddSubscriptor