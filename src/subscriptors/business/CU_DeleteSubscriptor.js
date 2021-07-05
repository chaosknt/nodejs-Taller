import { emailCreate } from '../models/valueObjectEmail.js'

function deleteSubscriptor( { DaoSubscriptions, subscriptor } ){

    const daoSubs = DaoSubscriptions;   
    const manageSubscriptor = subscriptor;   

    return {        
        unsubscribe: async ( email ) => {

            const isValidEmail = emailCreate(email);
            const sub = await daoSubs.get(isValidEmail);                         
            await manageSubscriptor.canUnsubscribe(sub);
            const result = await daoSubs.delete(isValidEmail);
            await daoSubs.close();
            return { rta: result };
        }
    }
}

export {deleteSubscriptor}