const subs = [ {email: 'chaosknt@gmail.com'}, { email: 'prueba@prueba.com'} ];

function createDaoSubscriptions(){
    return {
        add : ( newMail ) => {
             
            subs.push(  newMail );           
            return [...subs] 
           
        },
        delete: async ( subsEmail ) => {
                           
            const index = subs.findIndex(e => e.email === subsEmail.email)     
                      
            if (index === -1){
                
                return { deleted: 0 }

            }else{

                subs.splice(index, 1)      
                return { deleted: 1 }
            }

        },
        get: async ( subsEmail ) => {            

             const r = subs.filter(element => element.email == subsEmail.email);           
             return r[0] || {email: ''}
        },
        getAll: () => {
            return [...subs];
        },
        close: () => {
            console.log('conexion cerrada');
        }
    }
}

export {createDaoSubscriptions}