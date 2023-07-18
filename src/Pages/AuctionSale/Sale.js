import React from 'react'
import { useState,useEffect } from "react";
import { useParams,Link , useHistory,Redirect} from 'react-router-dom';
import GetServices from "../../Services/getServices";
import Chat from './Chat';
import NavBar from "../../Layouts/NavBar";
import loader from "../../Images/loader.gif";
const moment=require("moment");
const API_URL="http://localhost:5000/images/";

function Sale({user}) {
    const history=useHistory();
    const  id_vente=useParams().id_vente;
    const[sale,setSale]=useState([]);
    const[minutes,setMinutes]=useState();
     const[debDate,setDebDate]=useState();
    const[load,setLoad]=useState(true);
    const[showChat,setShowChat]=useState(false);

    const joinSale=()=>{
        setShowChat(!showChat);
    }

    useEffect(()=>{
        setTimeout(()=>{
            setLoad(false);
        },1000)
        setTimeout(()=>{
            setShowChat(true);
        },2000)
        GetServices.getOneSale(id_vente).then((response)=>{
            if(response.status===200){
                if(response.data.length>0){
                    setSale(response.data);
                    setMinutes(response.data[0].duration);
                    setDebDate(response.data[0].date);
                }else{
                    setSale([]);
                    history.push('/joindre');
                }
               
            }else{
                setSale([]);
                history.push('/joindre');
            }	
        },
        (error)=>{
            setSale([]);
        })
    },[])
  return (
      <main roles="main">
      {user?(
        <>
    <NavBar />
    <div className="container marketing">
    <div className="row m-5"> 
       {!load  &&  sale.map((sale)=>{return(
                        <div className="col-md-4 border">
                        <img src={API_URL+sale.url_image}  className="bd-placeholder-img rounded-circle" width="300" height="300"  preserveAspectRatio="xMidYMid slice" focusable="false" role="img" /><title>Placeholder</title>
                        <h2>{sale.title} (ID: {sale.id_sale})</h2>
                        <p><span className="">Description :</span><span className='text-muted'>{sale.description}</span></p>
                        <p class=""><span className="">Date :</span><span className='text-muted'> {moment(sale.date).format("DD-MM-YY")} à {moment(sale.date).hours()}H:{moment(sale.date).minutes()} ({moment(sale.date).fromNow()})</span></p>
                            <p class=""><span className=''>Durée :</span><span className='text-muted'> {sale.duration} minute(s)</span></p>
                            <div class="text-secondary">
                             Prix initial: {sale.initial_price} AR
                            </div>
                        {/* <div className='text-center my-5'><button  className='text-center btn btn-dark' onClick={joinSale}>{showChat?<>Fermer la discussion </>:<>Voir la discussion <i className='fa fa-arrow-right'></i></>}</button></div>                  */}
                        {user.roles=="admin" && <div className='text-dark'><Link to={"/admin/modifier_vente/"+id_vente}>Modifier la vente</Link></div>}
                               </div>
                      
                      )}) }
                        <div className="col-md-8 border">
                     {!load &&(showChat? (<Chat user={user} vente={sale} id_vente={id_vente} minutes={minutes} debDate={debDate}/>):(<img src={loader} width="100%" height="100%"/>))}
                        </div>
                           
        {load && 
       <div className='m-5 text-center text-dark' style={{width:"100%",height:"100%"}}>
        Chargement...
        <span className="spinner-border" role="status">
		 <span classnAME="sr-only"></span>
	    </span>
        </div>}
    </div>
    </div>
    </>
    ):(<Redirect to="/connexion"/>)}
    </main>
  )
}

export default Sale
