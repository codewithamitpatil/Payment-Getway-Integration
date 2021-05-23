
module.exports =
{

 ErrorResponse:async(err,req,res,next)=>{



    if(err.isJoi)
    {
        err.status = 400;
    }
   
    console.log(err.message);
    res.status(err.status).json({
        'status':err.status,
        'msg':err.message
    })

 }



}
