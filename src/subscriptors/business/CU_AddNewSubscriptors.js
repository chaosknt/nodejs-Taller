import { errorEmailAlreadyExists } from '../../shared/error/subscriptorErrors/errorEmailAlreadyExists.js';
import { emailCreate } from '../models/valueObjectEmail.js'

function addNewSubscriptor( { DaoSubscriptions, subscriptor } ){

    const daoSubs = DaoSubscriptions;   
    const manageSubscriptor = subscriptor;   

    return {
        subscribe : async ( email ) => {
           
                const isValidEmail = emailCreate(email);                      
                const sub = await daoSubs.get(isValidEmail);                                                
                await manageSubscriptor.canSubscribe(sub);           
                const result = await daoSubs.add(isValidEmail);
                await daoSubs.close();
                return { rta: result };
                               
        }        
    }
}

export {addNewSubscriptor}