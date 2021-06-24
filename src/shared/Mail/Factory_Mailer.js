import Mailer from "./mailer.js";
import { settings } from "./settings.js";

function createMailer(){

    const mailSender = new Mailer(settings);
    return mailSender;
}

export default createMailer