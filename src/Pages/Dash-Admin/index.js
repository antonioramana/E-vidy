import Footer from "../../Layouts/Footer";
import NavBarAdmin from "./NavBarAdmin";
import {Redirect,Link} from "react-router-dom";
import { useState,useEffect } from "react";

import GetServices from "../../Services/getServices";
import DeleteServices from "../../Services/deleteServices";
import NavBar from "../../Layouts/NavBar";

const moment=require("moment");
const API_URL="http://localhost:5000/images/"; 

function DashAdmin({user}) {
    const[sales,setSales]=useState([]);
  useEffect(()=>{
        //get all messengers
        GetServices.getAllSales().then((response)=>{
          if(response.status===200){
              setSales(response.data);
          }else{
              setSales([]);
          }	
      });
      console.log(sales)
  })
  const handleDelete=(id_sale)=>{
    DeleteServices.deleteSale(id_sale);
  }
    return (
    <>
        {user.roles=="admin"&&<div class="admin m-5">
                    <NavBar />
                    <div className="row m-2">
                    <Link className="btn btn-secondary" to={"/admin/nouvelle_vente"}>Ajouter une nouvelle vente</Link>
                    </div>
                      <h1 className="text-center text-dark m-3 ">Liste des ventes:</h1>
                    <div className="table-responsive">
                            <table className="table align-middle table-hover table-bordered ">
                                <thead className="table-dark">
                                    <tr className="">
                                        <th>ID</th>
                                        <th>Titre</th>
                                        <th>P.Initial</th>
                                        <th>Date</th>
                                        <th>Durée</th>
                                        <th>Status</th>
                                        <th>Description</th>
                                        <th>Image</th>
                                        <th>P.Final</th>
                                        <th>Acheteur</th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {sales.map((sale)=>{
                                  return(
                                <tr div class="" id={sale.id_sale}>
                                    <td>{sale.id_sale}</td>
                                    <td>{sale.title}</td>
                                    <td>{sale.initial_price}</td>
                                    <td>{moment(sale.date).format("DD-MM-YY")} à {moment(sale.date).hours()}H:{moment(sale.date).minutes()} ({moment(sale.date).fromNow()})</td>
                                    <td>{sale.duration} Minute(s)</td>
                                    <td>{sale.status}</td>
                                    <td>{sale.description}</td>
                                    <td><img className="round" src={API_URL+sale.url_image} style={{height:"3em",width:"5em"}}/></td>
                                    <td>{sale.final_price==0?(<span>En attente</span>):(<span>{sale.final_price}</span>)}</td>
                                    <td><Link className="" to={"/admin/utilisateur/"+sale.id_buyer}>{sale.id_buyer}</Link></td>
                                    <td> <Link className="btn btn-primary" to={"/vente/"+sale.id_sale}>Joindre</Link></td>
                                    <td><Link className="btn btn-success" to={"/admin/modifier_vente/"+sale.id_sale}>Modifier</Link></td>
                                    <td><button className="btn btn-danger" onClick={()=>{handleDelete(sale.id_sale)}}>Supprimer</button></td>    
                                </tr>
                                    )
                                }) }                                        
                                </tbody>
                            </table> 

                     </div>
                    <Footer />
                </div>}
        {user.roles!="admin"&&<Redirect to="/"/>} 
        {!user&&<Redirect to="/connexion"/>} 
     </>              
    );
  }
  
  export default DashAdmin;