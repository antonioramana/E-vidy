const express=require("express");
const router=express.Router();


const messengerController=require("../controllers/messengerController");

router.get("/get/:id_sale",messengerController.get);
router.post("/create",messengerController.addMessenger);

module.exports=router;