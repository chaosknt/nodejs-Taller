//import jwt from 'jsonwebtoken'

function auth(req, res, next){
    try {
        // const token = req.header('Authorization').replace('Bearer ', '');
        // userId = jwt.verify(token, 'PPPPPP');            
        next();
    } catch (error) {
       res.status(401).send({error: error.message});
    }
}

export {auth};