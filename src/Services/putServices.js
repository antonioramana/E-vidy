import axios from "axios";

const API_URL="http://localhost:5000";

//edit a sale
const editSale=(id_sale,id_buyer,final_price,status,title,description,initial_price,date,duration)=>{
    return axios.put(API_URL+"/sale/edit/"+id_sale,{id_buyer,final_price,status,title,description,initial_price,date,duration});
}
const putServices={editSale};

export default putServices;