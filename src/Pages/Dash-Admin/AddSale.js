import Footer from "../../Layouts/Footer";
import PostServices from "../../Services/postServices";
import { Link} from 'react-router-dom';
import { useState } from 'react';
import {Redirect} from "react-router-dom";
import NavBar from "../../Layouts/NavBar";

function AddSale({user}) {

	const[duration,setDuration]=useState("");
	const[title,setTitle]=useState("");
	const[description,setDescription]=useState();
	const[initial_price,setInitial_price]=useState();
	const[date,setDate]=useState();
	const[file,setFile]=useState("");
	const[successMessage,setSuccessMessage]=useState("");
	const[erroMessage,setErrorMessage]=useState("");

    const handleSubmit=async(e)=>{
		e.preventDefault();
		 PostServices.addSale(title,description,initial_price,duration,file,date)
			.then((data)=>{
				if(data.created===true){
					setSuccessMessage(data.message);
					setErrorMessage("");
					setDuration("");
					setTitle("");setDescription("");
					setInitial_price("");
				}else if(data.created===false){
					setErrorMessage(data.message);
					console.log(data.message);
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
    return (
		<>
				{user && user.roles=="admin"&&<div class="admin">
						<NavBar />
			<div class="admin m-5">
					<div className="row m-2">
                    <Link className="btn btn-outline-dark" to={"/admin/"}>Liste des ventes</Link>
                    </div>
			<form  onSubmit={handleSubmit} className="container my-5 border p-2 text-center"  style={{width:"80%"}}>
							<hr  className="" />
						<h2 className="text-center text-secondary">Nouvelle vente :</h2>
							<div className="m-2">
							<div className="row">
							  <div className="col-md-6">
								  <label htmlFor="title" className="form-label">Titre:</label>
								  <input type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}} className="form-control" placeholder="..." id="title" required/>
							  </div>
							  <div className="col-md-6">
								  <label htmlFor="price" className="form-label">Prix de départ:</label>
								  <div className="input-group">
									  <input type="number" value={initial_price} onChange={(e)=>{setInitial_price(e.target.value)}} min="1" placeholder="..." className="form-control"  id="price" required/>
									  <button className="btn btn-secondary" disabled> <span className="brown">AR</span> </button>
								 </div>
							  </div>
						 	 </div>
							  <div className="row">
							  <div className="col-md-6">
								<label htmlFor="date" className="form-label">Date:</label>
								<input type="datetime-local" value={date} className="form-control" id="date" onChange={(e)=>{setDate(e.target.value)}} required/> 
							  </div>
							  <div className="col-md-6 ">
								  <label htmlFor="minute" className="form-label">Nombre de minute:</label>
								  <div className="input-group">
								  	<input type="number"  min="1" value={duration} onChange={(e)=>{setDuration(e.target.value)}} className="form-control" id="minutes" placeholder="..." required />
								  	<button className="btn btn-secondary" disabled> <span className="brown">Minutes</span> </button>
								  </div>
							  </div>
						  </div>
						  <div className="row">
						  <div className="col-md-6">
								<label htmlFor="image" className="form-label">Choisir l'image:</label>
								<input type="file" filename={file} onChange={(e)=>{setFile(e.target.files[0])}} accept="image/*" className="form-control" id="image" required/>
							  </div>
						  	<div className="col-md-6">
								  <label htmlFor="description" className="form-label">Description:</label>
								  <textarea  placeholder="..." value={description} onChange={(e)=>{setDescription(e.target.value)}} className="form-control" id="description" required>
								  </textarea>
							  </div>
						  </div>
							</div>
							<div className="m-5">
								<input type="submit" value="ENREGISTRER" className="btn btn-secondary p-2" style={{width:"100%"}} name="submit" id="submit"/>
							</div>
							{erroMessage && <div className="alert alert-danger row text-center fs-4 mt-0">{erroMessage}</div>}
						  {successMessage && <div className="alert alert-success text-center row fs-4 mt-0"> {successMessage} <Link to="/admin/">Liste des ventes</Link> </div>}
            </form>
					</div>
						<Footer />
				</div>}
				{user.roles!="admin"&&<Redirect to="/"/>} 
				{!user&&<Redirect to="/connexion"/>} 

		</>
    );
  }
  
  export default AddSale;