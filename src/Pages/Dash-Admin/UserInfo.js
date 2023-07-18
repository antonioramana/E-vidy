import React, { useEffect,useState } from 'react'
import { useParams,Redirect,Link } from 'react-router-dom';
import GetServices from "../../Services/getServices";
import NavBar from "../../Layouts/NavBar";
import Footer from "../../Layouts/Footer";
import loader from "../../Images/loader.gif";

function UserInfo({user}) {
   
 const username=useParams().username;
 const[loading,setLoading]=useState(true);
 const[userInfo,setUserInfo]=useState([]);

setTimeout(()=>{
    setLoading(false);
},1000)

useEffect(()=>{
    GetServices.getUser().then((response)=>{
    const data=response.data;
        setUserInfo(data.filter((list)=>list.username===username));
        console.log(user);
})

},[])
    return (
    <main roles="main" className=''>
     {user.roles=="admin" && <div className="">
             <NavBar />
             <div className="container my-5 border p-2 text-center" style={{width:"60%"}}>
               
                { !loading ?( <>
                     <hr  className="" />
                     <h4 className="text-center text-secondary">Informations de l'utilisateur :</h4>
                                    {userInfo.map((list)=> {
                                    return <div className='container'>
                                            <div className="row border p-3 bg-secondary text-light">Nom d'utilisateur:  {list.username}</div>
                                            <div className="row border p-3">Email:  {list.email}</div>
                                            <div className="row border p-3">Contact:  {list.phone}</div>
                                            <div className="row border p-3">Adresse:  {list.adresse}</div>
                                            <div className="row border p-3"></div>
                                    </div>
                                    })
                                        }
                        </>):(<div className="text-center"><img src={loader} width="50%" height="50%"/></div>)
                        }     
                   <Link to="/admin">Aller au dashboard</Link>
               
            </div>
            <Footer />
        </div>}
        {user.roles!=="admin" &&<Redirect to="/"/>} 
    </main>
  )
}

export default UserInfo
