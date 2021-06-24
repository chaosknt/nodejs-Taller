import { getEmailSettings } from "../../config.js";

const settings = getEmailSettings()

/*const settings = {

    smtHost: "smtp.gmail.com", //Email provider
    sendingPort: 465, // port 
    isSecure: true,  // is secure
    userName: "chaosknt@gmail.com", //username
    password: "nunonnujcouuciqb" // password
}*/

export { settings }