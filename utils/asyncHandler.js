// asyncHandler is used to wrap async functions to handle errors gracefully and pass them to the next middleware. asyncHandler does is that it catches any errors thrown in the async function and passes them to the next middleware, typically an error handler.

const asyncHandler = (requetHandler) => {
  return(req, res, next) => {
    Promise.resolve(requetHandler(req, res, next).catch((error) => next(error)))
  }
}

/*
Understanding the upper syntax line by line
we first define a function asyncHandler that takes a single argument requestHandler, which is expected to be a function (typically an Express.js route handler).
then we return a new function that takes the standard Express.js middleware parameters: req (the request object), res (the response object), and next (a function to pass control to the next middleware).
Inside this returned function, we use Promise.resolve to ensure that the result of calling requestHandler is treated as a Promise. This is important because requestHandler might be an asynchronous function that returns a Promise.
We then call requestHandler with the req, res, and next arguments. If requestHandler resolves successfully, nothing special happens; the response is sent as usual.
However, if requestHandler throws an error or returns a rejected Promise, the catch block is triggered. In this block, we call next(err), passing the error to the next middleware in the Express.js stack. This is typically an error-handling middleware that can send an appropriate error response to the client.
*/