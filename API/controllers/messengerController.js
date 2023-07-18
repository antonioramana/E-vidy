const db=require("../config/database");

module.exports={

    // get sale's message
    get:(req,res)=>{   
    const  id_sale=req.params.id_sale;
    const id_user=req.headers.id_user;
   
    const getMessenger="SELECT * FROM messenger WHERE  id_sale=?  ORDER BY date ASC";
    //const getMessenger="SELECT * FROM messenger,user WHERE id_sale=?  ORDER BY date DESC";
    db.query(getMessenger,[id_sale],(error,result)=>{
        if(error){
            console.log(error.sqlMessage);
        }else{
            res.status(200);//ok
            res.send(result);
        }
    });
   },

   // add new message and conversation
    addMessenger:(req,res)=>{
      const username=req.body.username;
      const  text=req.body.text;
      const  id_sale=req.body.id_sale;
        const  date=new Date();
        
        const createMessenger="INSERT INTO messenger (username,text,id_sale,date) VALUE (?,?,?,?)";
        db.query(createMessenger,[username,text,id_sale,date],(error,result)=>{
            if(error){
                console.log(error.sqlMessage);
                res.send({message:error.sqlMessage,add:false}); 
            }else{
            res.status(201);//Created
            res.send({result:result,add:true,message:"Message envoyé avec succès"});
            }
        });
    },

}
