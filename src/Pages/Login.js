import Footer from "../Layouts/Footer";
import NavBar from "../Layouts/NavBar";
import { Link, useHistory} from 'react-router-dom';
import { useState } from 'react';
import AuthServices from "../Services/authServices";

function Login() {
	const[username,setUsername]=useState("");
	const[password,setPassword]=useState("");
	const history=useHistory();
	const[erroMessage,setErrorMessage]=useState("");

	const handleLogin=async(e)=>{
		e.preventDefault();
			 AuthServices.login(username,password)
				.then((data)=>{
					if(data.auth===true){
						history.push("/joindre");
						console.log("connecté");
					}else{
						setErrorMessage(data.message)
					}
				},
				(error)=>{
					setErrorMessage(error);
				})
				
	}
  return (
	<main roles="main">
		<NavBar />
		<form onSubmit={handleLogin} className="container my-5 border p-3 text-center"style={{width:"50%"}}>
                    <hr  className="" />
                <h1 className="text-center text-secondary">Connexion :</h1>
                    <div className="m-2">
						<label className="form-label">Nom d'utilisateur</label>
						<input className="form-control" type="text" name="Username" value={username} onChange={(e)=>{setUsername(e.target.value)}} required />
						<label className="form-label">Mot de passe</label>
						<input className="form-control" type="password" name="pwd" value={password} onChange={(e)=>{setPassword(e.target.value)}} required />
				    </div>
                    <div className="m-2">
						<button type="submit" className="btn btn-secondary"  style={{width:"100%"}} >Connexion</button>
                    </div>
					{erroMessage && <div className="text-danger">{erroMessage}</div>}
					<p>Vous n'avez pas encore un compte? <Link to="/inscription">Inscrivez-vous</Link></p>         
        </form>
		<Footer />
	</main>
  );
}

export default Login;
