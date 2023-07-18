import authHeader from "./authHeader";
import axios from "axios";

const API_URL="http://localhost:5000";


//delete a sale
const deleteSale=(id_sale)=>{
    return axios.delete(API_URL+"/sale/delete/"+id_sale);
}
const deleteServices={deleteSale};

export default deleteServices;