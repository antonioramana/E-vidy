const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
const db=require("../config/database");
const saltRounds=10;
const timeAsp=60*3;

require("dotenv").config();

module.exports={

    //user register
    register:(req,res)=>{
        const {username,email,password,phone,adresse}=req.body;

        const getUserByEmail="SELECT * FROM user WHERE username=?"; //chess exist email
         db.query(getUserByEmail,email,(err,result)=>{
           
            if(err){ //if error
                res.send({err:err,message:"Mauvaise connexion à la base"});
            }

          else if(result.length>0){  //if email already exists
                res.send({message:"Le nom d'utilisateur existe déjat"});
            }else{
               //create new user  
                const createUser="INSERT INTO user (username,email,password,phone,adresse) VALUE (?,?,?,?,?)";
                 bcrypt.hash(password,saltRounds,(err,hash)=>{
                    if(err){
                        console.log(err);
                    }else{
                        db.query(createUser,[username,email,hash,phone,adresse],(error,result)=>{
                            if(error){
                                res.status(204); //no content 
                                console.log(error.sqlMessage);
                            }else{
                            res.status(201);//Created
                            res.send({result:result,register:true,message:"Utilisateur enregistré avec succès"});
                            }
                        });
                    }

                });
        
            }
            
        });
        
    },

    //user login

    login:(req,res)=>{
            const {username,password}=req.body;
            //get user by email
            const getUserByEmail="SELECT * FROM user WHERE username=?";
            db.query(getUserByEmail,username,(err,result)=>{
                if(err){
                    res.send({err:err,message:"Problème de connexion à la base de donnée"});
                }
                //if email exists
                else if(result.length>0){
                    bcrypt.compare(password,result[0].password,(error,response)=>{//check password
                        if(response){
                            const roles=result[0].roles;
                            const username=result[0].username;
                            const email=result[0].email;
                            const token=jwt.sign({username},process.env.JWT_SECRET,{expiresIn:timeAsp});
                            res.json({auth:true,token:token,username:username,email:email,roles:roles});
                        }else{
                            res.send({auth:false,message:"Mauvais mot de passe"});
                        }
                    });
                }else{
                    res.send({auth:false,message:"Cet utilisateur n'existe pas"});
                }
            });
        },

    getall:(req,res)=>{
        const getAllUser="SELECT * FROM user";
        db.query(getAllUser,(err,result)=>{
            if(err){
               console.log(err.sqlMessage);
            }else{
                res.status(200);
                res.send(result);
            }
        });
    },
}
