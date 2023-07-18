const express=require("express");
const router=express.Router();


const priceController=require("../controllers/priceController");

router.get("/get/:id_sale",priceController.get);
router.post("/create",priceController.addPrice);

module.exports=router;