import dotenv from 'dotenv'
dotenv.config()

const getPort = () => process.env.PORT || 3000
const getCnxStr = () => process.env.CNX_STR
const getMode = () => process.env.MODE || 'TEST'
const getEmailSettings = () => {

  const settings = {

    smtHost: process.env.SMTPHOST,
    sendingPort: Number(String(process.env.SENDINGPORT)),    
    isSecure: true, //Boolean(string(process.env.ISSECURE)),
    userName: process.env.MAIL,
    password: process.env.PASSWORD,

  }
  return settings
}
export {
  getCnxStr, getMode, getPort, getEmailSettings
}