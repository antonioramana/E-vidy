const db=require("../config/database");

module.exports={
    //get all sales
    getAll:(req,res)=>{
   
    const getAllSale="SELECT * FROM sale ORDER BY date DESC";
    db.query(getAllSale,(error,result)=>{
        if(error){
            console.log(error.sqlMessage);
        }else{
            res.status(200);//ok
            res.send(result);
        }
    });
   },

    //get last sales
    getLast:(req,res)=>{
        const getLastSale="SELECT * FROM sale WHERE status='en_attente' ORDER BY date ASC LIMIT 3";
        db.query(getLastSale,(error,result)=>{
            if(error){
                console.log(error.sqlMessage);
            }else{
                res.status(200);//ok
                res.send(result);
            }
        });
       },
    //get One sale
   getOne:(req,res)=>{
    
    const id_sale=req.params.id_sale;
    console.log(id_sale)
    const getOneSale="SELECT * FROM sale WHERE id_sale=?";
    db.query(getOneSale,[id_sale],(error,result)=>{
        if(error){
            console.log(error.sqlMessage);
        }else{
            res.status(200);//ok
            res.send(result);
        }
    });
   },
    //add new sale
    addSale:(req,res)=>{
        var random1=Math.round(Math.random() * 100);
        var random2=Math.round(Math.random() * 100);
        const id_sale="V-"+random1+"-"+random2;
        //const date=new Date();//Date.now()
        const url_image=req.file.filename;
        const {title,description,initial_price,duration,date}=req.body;
        console.log(req.body)
        const createSale="INSERT INTO sale (id_sale,title,description,url_image,initial_price,date,duration) VALUE (?,?,?,?,?,?,?)";
        db.query(createSale,[id_sale,title,description,url_image,initial_price,date,duration],(error,result)=>{
            if(error){
                console.log(error.sqlMessage);
                res.send({created:false,message:error.sqlMessage});
            }else{
            res.status(201);//Created
            res.send({result:result,created:true,message:"Vente ajoutée  avec succès"});
            }
        });
    },
     // Edit sale
     updateSale:(req,res)=>{
      console.log(req.body)
        const id_sale=req.params.id_sale;
        const {title,description,initial_price,date,duration,final_price,id_buyer,status}=req.body;
    
        const editSale="UPDATE sale SET title=?, description=?,initial_price=?,date=?,duration=?, final_price=?,id_buyer=?,status=? WHERE id_sale=?";
        db.query(editSale,[title,description,initial_price,date,duration,final_price,id_buyer,status,id_sale],(error,result)=>{
            if(error){
                console.log(error.sqlMessage);
                res.send({created:false,message:error.sqlMessage});
            }else{
            res.status(201);//Created
            res.send({result:result,created:true,message:"Vente modifiée  avec succès"});
            }
        });
    },
    //delete a sale
    deleteSale:(req,res)=>{
        const id_sale=req.params.id_sale;
       // const id_user=req.headers.id_user;
        const removeSale="DELETE FROM sale WHERE id_sale=? ";
        db.query(removeSale,[id_sale],(error,result)=>{
            if(error){
                console.log(error);
                res.send({delete:false,message:error.sqlMessage});
            }else{
            res.status(202);//Accepted 
            res.send({result:result,delete:true,message:"Vente supprimée avec succès"});
            }
        });
    },
}
