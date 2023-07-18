const jwt=require("jsonwebtoken");
module.exports={
    get:(req,res)=>{
        if(!req.headers["x-access-token"]){
            res.status(401).send("You need a token");
        }else{
            const token=req.headers["x-access-token"];
            jwt.verify(token,process.env.JWT_SECRET,(err,payload)=>{
                if(err){
                    res.status(401).send("Authentication failed");
                   // res.json({auth:false,message:"Authentication failed"});
                }else if(req.headers.id_user!==payload.id_user&&req.headers.email!==payload.email){
                    res.status(401).send("Authentication failed");
                    //res.json({auth:false,message:"Authentication failed"});
                }else{
                    res.send("Authenticated");
                    //next();
                }
            })
        }
    }
}

