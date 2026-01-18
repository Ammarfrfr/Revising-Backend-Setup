class ApiError extends Error{
  // constructor (default values if not something written)
  constructor(
    statusCode,
    message = "Something Went Wrong",
    errors = [],
    stack = ""
  ){
    super(message)
    this.message = message
    this.data = null
    this.succes = false
    this.statusCode = statusCode
    this.errors = errors
    
    if(stack){
      this.stack = stack
    } else{
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

export { ApiError }