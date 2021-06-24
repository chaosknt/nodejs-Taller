function errorInvalidEmail() {
    const err = new Error('el email es incorrecto.')
    err.type = 'ERR_EMAIL_INVALID'
    return err
  }
  
  export { errorInvalidEmail }