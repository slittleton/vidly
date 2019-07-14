module.exports = function asyncMiddleware(handler){
  return async (req, res, next) => {
    try{
      await handler(req, res)
    }catch(ex){
      next(ex)// calling next here will send the exception to the error handling
      // middleware at the bottom of the other middlewares 
      // i.e. the last app.use('filelocation', middleware) because this
      // last middleware is specifically for handling errors it will take
      // the exception and deal with it
    }
  };
}