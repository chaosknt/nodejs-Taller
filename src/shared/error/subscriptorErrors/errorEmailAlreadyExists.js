function errorEmailAlreadyExists() {
    const err = new Error('el email ya esta agregado.')
    err.type = 'ERR_EMAIL_FOUND'
    return err
  }
  
  export { errorEmailAlreadyExists }