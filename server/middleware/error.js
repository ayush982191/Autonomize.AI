export const errorMiddleware = (err,req,res,next)=>{
    err.message ||= "Internal Server Error";
    err.statusCode ||= 500;
    if(err.name == "CastError")
        err.message = "Invalid mongoDB ID"
    return res.status(err.statusCode).json({
        success : false,
        message : err.message
    })
}

export const TryCatch = (func) => (req,res,next) =>{
    Promise.resolve(func(req,res,next)).catch(next);
}