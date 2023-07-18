import { Link } from 'react-router-dom';
import { useState,useEffect } from "react";

import GetServices from "../../Services/getServices";
import DeleteServices from "../../Services/deleteServices";

function SaleList({user}) {
  const[sales,setSales]=useState([]);
  useEffect(()=>{
        //get all sales
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
    <div>
        <h3>LISTE VENTE</h3>
        <Link to={"/admin/nouvelle_vente"}>Ajouter une nouvelle vente</Link>
       {sales.map((sale)=>{
        return(
      <div div class="">
     {sale.title} <Link to={"/vente/"+sale.id_sale}>Joindre</Link>
     <Link to={"/admin/modifier_vente/"+sale.id_sale}>Modifier</Link>
     <button onClick={()=>{handleDelete(sale.id_sale)}}>Supprimer</button>
     </div>
        )
       }) }
       
    </div>
  );
}

export default SaleList;