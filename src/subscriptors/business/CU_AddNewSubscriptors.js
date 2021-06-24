import { errorEmailAlreadyExists } from '../../shared/error/subscriptorErrors/errorEmailAlreadyExists.js';
import { emailCreate } from '../models/valueObjectEmail.js'

function addNewSubscriptor( { DaoSubscriptions, subscriptor } ){

    const daoSubs = DaoSubscriptions;   
    const manageSubscriptor = subscriptor;   

    return {
        subscribe : async ( email ) => {
           
                const e = emailCreate(email);                      
                const sub = await daoSubs.get(e);                                                
                await manageSubscriptor.canSubscribe(sub);           
                const r = await daoSubs.add(e);
                await daoSubs.close();
                return { rta: r };
                               
        }        
    }
}

export {addNewSubscriptor}