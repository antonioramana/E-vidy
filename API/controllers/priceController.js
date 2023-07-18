const db=require("../config/database");

module.exports={

    // get sale's price
    get:(req,res)=>{   
    const  id_sale=req.params.id_sale;
   
    const getPrice="SELECT * FROM price WHERE  id_sale=?  ORDER BY date ASC";
    db.query(getPrice,[id_sale],(error,result)=>{
        if(error){
            console.log(error.sqlMessage);
        }else{
            res.status(200);//ok
            res.send(result);
        }
    });
   },

   // add new price for sale
    addPrice:(req,res)=>{
      const username=req.body.username;
      const  price=req.body.price;
      const  id_sale=req.body.id_sale;
        const  date=new Date();
        
        const createPrice="INSERT INTO price (username,price,id_sale,date) VALUE (?,?,?,?)";
        db.query(createPrice,[username,price,id_sale,date],(error,result)=>{
            if(error){
                console.log(error.sqlMessage);
                res.send({message:error.sqlMessage,add:false}); 
            }else{
            res.status(201);//Created
            res.send({result:result,add:true,message:"Prix envoyé avec succès"});
            }
        });
    },

}
