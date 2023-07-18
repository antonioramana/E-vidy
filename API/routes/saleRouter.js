const express=require("express");
const router=express.Router();
const upload=require("../middleware/upload");

const saleController=require("../controllers/saleController");

router.get("/all",saleController.getAll);

router.get("/last",saleController.getLast);

router.get("/one/:id_sale",saleController.getOne);

router.post("/create",upload.single("urlImage"),saleController.addSale);

router.put("/edit/:id_sale",saleController.updateSale);

router.delete("/delete/:id_sale",saleController.deleteSale);


module.exports=router;