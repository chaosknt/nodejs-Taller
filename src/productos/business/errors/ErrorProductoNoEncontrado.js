function crearErrorProductoNoEncontrado() {
  const error = new Error('no existe el producto')
  error.type = 'ERROR_PRODUCTO_NO_ENCONTRADO'
  return error
}

export { crearErrorProductoNoEncontrado }