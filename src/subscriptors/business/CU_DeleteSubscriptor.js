import { emailCreate } from '../models/valueObjectEmail.js'

function deleteSubscriptor( { DaoSubscriptions, subscriptor } ){

    const daoSubs = DaoSubscriptions;   
    const manageSubscriptor = subscriptor;   

    return {        
        unsubscribe: async ( email ) => {

            const e = emailCreate(email);
            const sub = await daoSubs.get(e);                         
            await manageSubscriptor.canUnsubscribe(sub);
            return { rta: daoSubs.delete(e) };

        }
    }
}

export {deleteSubscriptor}