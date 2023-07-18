import Footer from "../../Layouts/Footer";
import NavBar from "../../Layouts/NavBar";
import {Link, Redirect, useHistory} from "react-router-dom";
import { useState ,useEffect} from "react";
import GetServices from "../../Services/getServices";

function AuctionSaleJoin({user}) {
    const history=useHistory();
    const[id_vente,setId_Vente]=useState("");
    const[sales,setSales]=useState([]);
    const[information,setInformation]=useState("");

    const joinSale=()=>{  
        if(id_vente!==""&&sales.some((sale)=>sale.id_sale==id_vente)){
                history.push("/vente/"+id_vente);
            }else{
                setInformation("Cette vente n'est pas disponible")
            }
    }

  
    useEffect(()=>{
          //get all males
          GetServices.getAllSales().then((response)=>{
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
        {user &&<div className="">
             <NavBar />
             <div className="container my-5 border p-2 text-center" style={{width:"60%"}}>
                    <hr  className="" />
                <h4 className="text-center text-secondary">Joindre une vente :</h4>
                    
                    <div className="m-2">
                        <label>ID Vente:</label>
                        <input value={id_vente} onChange={(e)=>{setId_Vente(e.target.value)}}  placeholder="ID Vente..." className="form-control" type="text" name="room_id" required />
                    </div>
                    <div className="m-2">
                        <button className="btn btn-secondary" style={{width:"100%"}} onClick={joinSale}>JOINDRE</button>
                    </div>
                    {information!="" && <div className="alert alert-info m-1">{information}</div>}
        
                    {user.roles=="admin" && <Link to="/admin">Aller au dashboard</Link>}
               
            </div>
            <Footer />
        </div>}
        {!user&&<Redirect to="/connexion"/>} 
        </main>
    );
  }
  
  export default AuctionSaleJoin;