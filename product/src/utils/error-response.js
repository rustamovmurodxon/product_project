export const catchError=(err,res)=>{
    return res.status(500).json({
      error:err.message  
    })
}