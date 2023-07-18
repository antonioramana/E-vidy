import Footer from "../../Layouts/Footer";
import PutServices from "../../Services/putServices";
import { Link, useHistory, useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavBar from "../../Layouts/NavBar";
import {Redirect} from "react-router-dom";
import GetServices from "../../Services/getServices";
import loader from "../../Images/loader.gif";

const moment=require("moment");


function EditSale({user}) {
    const history=useHistory();
	const id_sale=useParams().id_sale;
	const[duration,setDuration]=useState("");
	const[title,setTitle]=useState("");
	const[description,setDescription]=useState();
	const[initial_price,setinitial_price]=useState();
	const[date,setDate]=useState();
	const[users,setUsers]=useState([]);
	const[id_buyer,setId_buyer]=useState(null);
	const[final_price,setFinal_price]=useState(null);
    const[status,setStatus]=useState("en_entente");
	const[successMessage,setSuccessMessage]=useState("");
	const[erroMessage,setErrorMessage]=useState("");
	const[loading,setLoading]=useState(true);

	setTimeout(()=>{
		setLoading(false);
	},1000)

    const handleSubmit=async(e)=>{
		e.preventDefault();
			PutServices.editSale(id_sale,id_buyer,final_price,status,title,description,initial_price,date,duration)
			.then((data)=>{
				if(data.data.created===true){
					setSuccessMessage(data.data.message);
					console.log("");
				}else if(data.data.created===false){
					setErrorMessage(data.data.message);
					console.log(data.data.message);
					setSuccessMessage("");
				}
			},
			(error)=>{
				console.log(error);
				setErrorMessage(error);
				setSuccessMessage("");
				console.log(error);
			})
			
	
	}
	useEffect(()=>{	
		GetServices.getOneSale(id_sale).then((response)=>{
            if(response.status===200){
                if(response.data.length>0){
                    setDuration(response.data[0].duration);   
                    setTitle(response.data[0].title);   
                    setDescription(response.data[0].description);   
                    setinitial_price(response.data[0].initial_price);
					setDate(moment(response.data[0].date).format("YY-MM-DD HH:MM:SS"));
					setId_buyer(response.data[0].id_buyer);
					setStatus(response.data[0].status);
					setFinal_price(response.data[0].final_price);

                }else{
                    console.log("Résultat vide");
                }
               
            }else{
				console.log("Résultat vide");
              
            }	
        },
        (error)=>{
			console.log(error);
        })
		
		},[])
		useEffect(()=>{
			GetServices.getUser().then((response)=>{
				setUsers(response.data);
		})
		},[])
    return (
        <main role="main">
        {user.roles=="admin"&&<div class="admin">
         <NavBar />
		{!loading ? (<div class="admin m-5">
				 <div className="row m-2">
                    	<Link className="btn btn-outline-secondary" to={"/admin/"}>Liste des ventes</Link>
                </div>
				<form onSubmit={handleSubmit} className="container my-5 border p-2 text-center"  style={{width:"80%"}}>
					<hr  className="" />
						<h2 className="text-center text-secondary">Modification de la vente ({id_sale}) :</h2>
						
							<div className="m-2">
								<div className="row">
									<div className="col-md-6">
										<label htmlFor="title" className="form-label">Titre:</label>
										<input type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}} className="form-control" placeholder="Titre de vente ..." id="title" required/>
									</div>
									<div className="col-md-6">
										<label htmlFor="price" className="form-label">Prix de départ:</label>
										<div className="input-group">
											<input type="number" value={initial_price} onChange={(e)=>{setinitial_price(e.target.value)}} min="1" placeholder="Prix de départ ..." className="form-control"  id="price" required/>
											<button className="btn btn-secondary" disabled> <span className="brown">AR</span> </button>
										</div>
									</div>
						 	 </div>
								<div className="row">
							  <div className="col-md-6">
										<label htmlFor="minute" className="form-label">Nombre de minute:</label>
										<div className="input-group">
											<input type="number"  min="1" value={duration} onChange={(e)=>{setDuration(e.target.value)}} className="form-control" id="minutes" placeholder="Nombre de minutes..." required />
											<button className="btn btn-secondary" disabled> <span className="">Minutes</span> </button>
										</div>
									</div>
									<div className="col-md-6">
									<label htmlFor="date" className="form-label">Date:({date})</label>
									<input type="datetime-local" value={date} className="form-control" id="date" onChange={(e)=>{setDate(e.target.value)}} /> 
									</div>
						 	 </div>
							  <div className="row">
									<div className="col-md-6">
										<label htmlFor="description" className="form-label">Description:</label>
										<textarea  value={description} onChange={(e)=>{setDescription(e.target.value)}} className="form-control" id="description" required>
										</textarea>
									</div>
									<div className="col-md-6">
										<label htmlFor="image" className="form-label">Choisir l'image:</label>
										<input type="file" disabled accept="image/*" className="form-control" id="image" required/>
									</div>
						 	 </div>
							 	 <div className="row m-2 p-2 border">
											<div className="col-md-4 border-end">
												<label htmlFor="Immatriculation" className="form-label">Acheteur:</label>
												<select value={id_buyer} onChange={(e)=>{setId_buyer(e.target.value)}} className="form-select">
												<option value={" "}>En attente...</option>
												{users.map((list)=>{
														return<option value={list.username}>{list.username}</option>
													})}		
												</select>
											</div>
											<div className="col-md-4 border-end">
												<label htmlFor="couleur" className="form-label">Prix Final:</label>
												<input type="number"  min="0" value={final_price} onChange={(e)=>{setFinal_price(e.target.value)}} className="form-control" id="" placeholder=""  />
											</div>
											<div className="col-md-4 border-end">
											<label htmlFor="couleur" className="form-label">Status de vente:</label>	
											<select className="form-select" value={status} onChange={(e)=>{setStatus(e.target.value)}}>
													<option value="en_attente">En attente</option>
													<option value="en_cours">En cours</option>
													<option value="termine">Terminé</option>
										</select>
											</div>
								</div>
							</div>
							<div className="m-5">
								<input type="submit" className="btn btn-secondary p-2" style={{width:"100%"}} value="MODIFIER"/>
							</div> 
							{erroMessage && <div className="alert alert-danger row text-center fs-4 mt-0">{erroMessage}</div>}
							 {successMessage && <div className="alert alert-success text-center row fs-4 mt-0"> {successMessage} <Link to="/admin/">Liste des ventes</Link> </div>}
            	</form>
        </div>):(<div className="text-center"><img src={loader} width="50%" height="50%"/></div>)}
            <Footer />
        </div>}
        {user.roles!="admin"&&<Redirect to="/"/>} 
        {!user&&<Redirect to="/connexion"/>} 
     	</main>      
        
    );
  }
  
  export default EditSale;