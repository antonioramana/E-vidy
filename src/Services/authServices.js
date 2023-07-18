import axios from "axios";


const API_URL="http://localhost:5000";

//Login

const login=(username,password)=>{
    return axios.post(API_URL+"/user/login",{username,password})
                .then((response)=> {
                    if(response.data.token){
                        localStorage.setItem("user",JSON.stringify(response.data));
                    }
                    return response.data;
                });
};

//Logout

const logout=()=>{
    localStorage.removeItem("user");
};

//Current user

const getCurrentUser=()=>{
    return JSON.parse(localStorage.getItem("user"));
};

const authService={login,logout,getCurrentUser};

export default authService;