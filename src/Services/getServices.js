import authHeader from "./authHeader";
import axios from "axios";

const API_URL="http://localhost:5000";


//get  products
const getProduct=()=>{
    return axios.get(API_URL+"/product/all",{headers:authHeader()});
}
//get sales
const getAllSales=()=>{
    return axios.get(API_URL+"/sale/all");
}
//get 4 last sales
const getLastSales=()=>{
    return axios.get(API_URL+"/sale/last");
}
//get one sale
const getOneSale=(id_vente)=>{
    return axios.get(API_URL+"/sale/one/"+id_vente);
}
//get sale's messenger
const getMessenger=(id_vente)=>{
    return axios.get(API_URL+"/messenger/get/"+id_vente,{headers:authHeader()});
}
//get sale's price
const getPrice=(id_vente)=>{
    return axios.get(API_URL+"/price/get/"+id_vente,{headers:authHeader()});
}
//get user
const getUser=()=>{
    return axios.get(API_URL+"/user/get/",{headers:authHeader()});
}
const getServices={getProduct,getAllSales,getLastSales,getOneSale,getMessenger,getPrice,getUser};

export default getServices;