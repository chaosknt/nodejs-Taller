import validator from 'email-validator';
import { errorInvalidEmail } from '../../shared/error/subscriptorErrors/errorInvalidEmail.js';

function emailCreate(email){    
    
    if(!validator.validate(email.email)){
        throw new errorInvalidEmail();        
    } 
    return email
}

export { emailCreate }