const express=require("express");
const router=express.Router();


const verifyToken=require("../controllers/verifyToken");

router.get("/get",verifyToken.get());

module.exports=router;