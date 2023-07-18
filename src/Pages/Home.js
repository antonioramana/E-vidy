import { Link } from 'react-router-dom';
import { useState,useEffect } from "react";
import Footer from "../Layouts/Footer";
import NavBar from "../Layouts/NavBar";
import GetServices from "../Services/getServices";
import logo from  '../Images/log.jpg'

const API_URL="http://localhost:5000/images/";
const moment=require("moment");

function Home({user}) {
  const[sales,setSales]=useState([]);
  useEffect(()=>{
        //get all sales
        GetServices.getLastSales().then((response)=>{
          if(response.status===200){
              setSales(response.data);
          }else{
              setSales([]);
          }	
      });
      console.log(sales)
  })
  return (
    <main role="main">
    	<NavBar />
      {/* SLIDE */}
      <div id="" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
            <div className="carousel-item active">
                <img className="bd-placeholder-img" width="100%" height="100%" src={logo} alt='...' preserveAspectRatio="xMidYMid slice" focusable="false" role="img" />
                <div className="container">
                    <div className="carousel-caption">
                        <h1>BIENVENUE SUR E-vidy:</h1>
                        <p>E-vidy est une Application web qui permet de faire une vente aux enchères en ligne à Madagascar..</p>
                        <p>Vous pouvez participer à la vente en joignant ici</p>
                        <p><Link className="btn btn-lg btn-secondary p-2" to="/inscription" role="button">S'inscrire</Link></p>
                    </div>
                </div>
            </div> 
        </div>
    </div>
    {/* LIST SALE */}
         
  <div className="container marketing">
  <div className="row">
       {sales.map((sale)=>{
        return(
          <div className="col-lg-4 border-start">
          <img src={API_URL+sale.url_image}  className="bd-placeholder-img rounded-circle" width="300" height="300"  preserveAspectRatio="xMidYMid slice" focusable="false" role="img" /><title>Placeholder</title>
          <h2>{sale.title} (ID: {sale.id_sale})</h2>
          <p><span className="">Description :</span><span className='text-muted'>{sale.description}</span></p>
          <p class=""><span className="">Date :</span><span className='text-muted'> {moment(sale.date).format("DD-MM-YY")} à {moment(sale.date).hours()}H:{moment(sale.date).minutes()} ({moment(sale.date).fromNow()})</span></p>
              <p class=""><span className=''>Durée :</span><span className='text-muted'> {sale.duration} minute(s)</span></p>
              <div class="text-secondary">
               Prix initial: {sale.initial_price} AR
              </div>
          <div><Link to={"/vente/"+sale.id_sale} className="btn btn-secondary my-2" role="button" width="100%" >JOINDRE </Link></div>
         </div>

        )
       }) }
    </div>
    </div>
        <Footer />
        </main>
  );
}

export default Home;
