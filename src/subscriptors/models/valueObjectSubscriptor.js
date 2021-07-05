import { errorEmailAlreadyExists } from "../../shared/error/subscriptorErrors/errorEmailAlreadyExists.js";
import { errorEmailDoNotExist } from "../../shared/error/subscriptorErrors/errorEmailDoNotExist.js";

errorEmailAlreadyExists
errorEmailDoNotExist
function valueObjectSubscriptor(){

    return {
        canSubscribe: ( email ) => {
                      
            const { email:e } = email;  
           
            if(e.length > 0){
                
                throw new errorEmailAlreadyExists();
            }
            return true;
        },
        canUnsubscribe: ( email ) => {

            const { email:e } = email;  
            if(e.trim().length === 0 ){
                throw new errorEmailDoNotExist();
            }
        },
        SendNotify: async (subs, Mailer, sendingObject) => {
                     
           if(subs.length > 0){

                subs.forEach(element => {

                    Mailer.send( { 
                                    to: element.email, 
                                    subject:sendingObject.subject, 
                                    htmlMsg: sendingObject.htmlMsg 
                                } )
                });
            }
        }
    }
}

export {valueObjectSubscriptor}