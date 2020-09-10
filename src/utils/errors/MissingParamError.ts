class MissingParamError extends Error {
  constructor(message) {
    super(message)
    this.name = 'MissingParamError'
  }
}

export default MissingParamError
