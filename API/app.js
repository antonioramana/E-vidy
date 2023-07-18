const express= require("express");
const app=express();
const bodyParser=require("body-parser");
const cors=require("cors");
require("dotenv").config();
app.use(express.static('public'));

const PORT= process.env.PORT ;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));


/*Routers*/

const userRouter=require("./routes/userRouter");
app.use("/user", userRouter);

const saleRouter=require("./routes/saleRouter");
app.use("/sale", saleRouter);

const messengerRouter=require("./routes/messengerRouter");
app.use("/messenger", messengerRouter);

const priceRouter=require("./routes/priceRouter");
app.use("/price", priceRouter);




app.listen(PORT,()=>{console.log("server is running on the port "+PORT)});