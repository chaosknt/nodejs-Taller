function errorEmailDoNotExist() {
    const err = new Error('el email no esta agregado.')
    err.type = 'ERR_EMAIL_NOT_FOUND'
    return err
  }
  
  export { errorEmailDoNotExist }