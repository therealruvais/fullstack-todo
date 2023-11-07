const {CustomApiError} = require('../Middleware/Custom-error')

const errorHandlerMiddleware =(err,req,res,next) => {
   if(err instanceof CustomApiError){
       return res.status(err.statusCode).json({msg:err.message});
}
    return res.status(500).json({msg:`Somethings Wrong look deep or Stop looking and Die...`})
}


module.exports= errorHandlerMiddleware;