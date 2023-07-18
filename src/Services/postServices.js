import axios from "axios";
import authHeader from "./authHeader";

const API_URL="http://localhost:5000";

//Signup
const signup=(username,email,password,phone,adresse)=>{
    return axios.post(API_URL+"/user/signup",{username,email,password,phone,adresse})
                .then((response)=> {
                    return response.data;
                }); 
};

//Add product
const addProduct=(id_product,title,description,amount_initial,file)=>{

    const formData= new FormData();
    formData.append("id_product",id_product);
    formData.append("productImage",file);
    formData.append("title",title);
    formData.append("description",description);
    formData.append("amount_initial",amount_initial);
  
return axios.post(API_URL+"/product/create",formData,{headers:authHeader()},{headers:{'Content-Type':'multipart/form-data'}})
            .then((response)=> {
                return response.data;
            });
};
//Add sale
const addSale=(title,description,initial_price,duration,file,date)=>{

    const formData= new FormData();
    formData.append("duration",duration);
    formData.append("urlImage",file);
    formData.append("title",title);
    formData.append("date",date);
    formData.append("description",description);
    formData.append("initial_price",initial_price);
  
    return axios.post(API_URL+"/sale/create",formData,{headers:{'Content-Type':'multipart/form-data'}})
            .then((response)=> {
                return response.data;
            });
};
//Add   auction 
const addAuction=(id_auction,id_product,date)=>{
    
    return axios.post(API_URL+"/auction/create",{id_auction,id_product,date},{headers:authHeader()})
            .then((response)=> {
                return response.data;
            });
};

//Add messenger
const addMessenger=(messenger)=>{
    return axios.post(API_URL+"/messenger/create",messenger,{headers:authHeader()})
            .then((response)=> {
                return response.data;
            });
}
//Add price
const addPrice=(userPrice)=>{
    return axios.post(API_URL+"/price/create",userPrice,{headers:authHeader()})
            .then((response)=> {
                return response.data;
            });
}
const postServices={signup,addProduct,addAuction,addSale,addMessenger,addPrice};

export default postServices;