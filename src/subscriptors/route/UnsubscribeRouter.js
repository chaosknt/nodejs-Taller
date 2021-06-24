import express from 'express'

function crearDeleteSubscriptor( apiCatalogo ){

const router = express.Router();

router.post('/', async (req, res, next) => {
    
    try {
            
        await apiCatalogo.unsibscribe(req.body);         
        res.json({ rta: 'Eliminado'});

    } catch (error) {       
        next(error)     
    }

})
router.use((err, req, res, next) => {
    if (err.type == 'ERR_EMAIL_NOT_FOUND') {
      res.status(404)
    } else {
      res.status(500)
    }
    res.json({ msg: err.message })
  })
  return router
}

export default crearDeleteSubscriptor
