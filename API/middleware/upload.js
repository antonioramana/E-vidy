const multer=require("multer");

const storage=multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null,"./public/images");
    },
    filename:(req, file, cb)=>{
       const uniqueSuffix=Date.now()+"-"+Math.round(Math.random() * 1E9);
       const filename=uniqueSuffix+file.originalname;
        cb(null,filename);
    }
})

const upload= multer({storage: storage});

module.exports=upload;