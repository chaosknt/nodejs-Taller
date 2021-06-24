import { addNewSubscriptor } from './CU_AddNewSubscriptors.js';
import { deleteSubscriptor } from './CU_DeleteSubscriptor.js';
import { notify } from './CU_NotifySubscriptors.js';

import { valueObjectSubscriptor } from '../models/valueObjectSubscriptor.js';
import createMailer from '../../shared/Mail/Factory_Mailer.js';

import {getDaoSubscriptors} from '../persistence/Factory_DaoSubscriptors.js'

const DaoSubscriptions = getDaoSubscriptors();
const subscriptor = valueObjectSubscriptor();
const Mailer = createMailer();

function createCUAddSubscriptor(){
    const s = addNewSubscriptor( { DaoSubscriptions, subscriptor } );
    return s;
}

function createCUDeleteSubscriptor(){
    const s = deleteSubscriptor( { DaoSubscriptions, subscriptor } );
    return s;
}

function createCUNotify(){
    const s = notify( { DaoSubscriptions, subscriptor, Mailer } )
    return s 
}

export { createCUAddSubscriptor, createCUDeleteSubscriptor, createCUNotify }