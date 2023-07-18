const jwt=require("jsonwebtoken");

require("dotenv").config();

const verifyJwt=(req,res,next)=>{
    const token=req.headers["x-access-token"];
    if(!token){
        res.send("You need a token");
    }else{
        jwt.verify(token,process.env.JWT_SECRET,(err,payload)=>{
            if(err){
                res.json({auth:false,message:"Authentication failed"});
            }else if(req.headers.id_user!=payload.id_user&&req.headers.email!=payload.email){
                res.json({auth:false,message:"Authentication failed"});
            }else{
                next();
            }
        })
    }
}

module.exports=verifyJwt;