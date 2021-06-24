function notify( { DaoSubscriptions, subscriptor, Mailer } ){

    const daoSubs = DaoSubscriptions; 
    const manageSubscriptors = subscriptor;       
    const mailer = Mailer;  

    return {        
       notify: async ( sendingObject ) => {

           const subs = await daoSubs.getAll();
           console.log(subs)
           await manageSubscriptors.SendNotify(subs, Mailer, sendingObject);
           return { sent: subs.length }
        }
    }
}

export {notify}