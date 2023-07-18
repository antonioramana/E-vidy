export default function authHeader(){
    const user=JSON.parse(localStorage.getItem("user"));
     if(user&&user.token){
         return{"x-access-token":user.token,"username":user.username,"email":user.email,"roles":user.roles}
     }else{
         return{};
     }
 }