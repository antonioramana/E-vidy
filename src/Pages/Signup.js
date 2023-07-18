import Footer from "../Layouts/Footer";
import NavBar from "../Layouts/NavBar";
import { Link} from 'react-router-dom';
import { useState } from 'react';
import PostServices from "../Services/postServices";

function Signup() {
  const[email,setEmail]=useState("");
	const[username,setUsername]=useState("");
	const[phone,setPhone]=useState("");
	const[adresse,setAdresse]=useState("");
	const[password,setPassword]=useState("");
	const[password2,setPassword2]=useState("");
	const[erroMessage,setErrorMessage]=useState("");
	const[successMessage,setSuccessMessage]=useState("");

  //function to signup
      const handleSignup=async(e)=>{
        e.preventDefault();
        if(password!==password2){    //check password confirmation
          setErrorMessage("Veuillez entrer le meme mot de passe");
          setSuccessMessage("");
        }else if(password.length<8){  //check password  length
          setErrorMessage("Le mot de passe minimum est de 8 caratères");
        }else{ //send information
          try{
            await PostServices.signup(username,email,password,phone,adresse)
            .then((data)=>{
              if(data.register===true){
                setSuccessMessage(data.message);
                setErrorMessage("");
                setEmail("");setUsername("");setPhone("");setPassword("");setPassword2("");
              }else{
                setErrorMessage(data.message);
                setSuccessMessage("");
              }
            },
            (error)=>{
              setErrorMessage(error);
              setSuccessMessage("");
              console.log(error);
            })
            
          }catch(err){
            setErrorMessage(err);
            setSuccessMessage("");
            console.log(err);
          }
        }
      }
  return (
    <>
      <NavBar />  
      <div class="w3-container w3-content  w3-padding-64" id="band">  
      <div class="bg-secondary w3-container" >
        <div class="w3-padding-64 w3-padding-large">
         {erroMessage && <div className="text-danger row">{erroMessage}</div>}
					{successMessage && <div className="text-success row">{successMessage} <Link to="/connexion"> Vous pouvez connecté maintenant</Link> </div>}
          <h1 className="text-center text-dark">INSCRIPTION :</h1>
          <p className="text-dark">Créer un compte</p>
          <form onSubmit={handleSignup} class="w3-container w3-card w3-padding-32 w3-white"  target="_blank">
            <div class="w3-section">
              <label>Nom d'utilisateur</label>
              <input class="w3-input"  type="text" name="Nom" value={username} onChange={(e)=>{setUsername(e.target.value)}} required />
            </div>
            <div class="w3-section">
              <label>Email</label>
              <input class="w3-input"  type="email" required name="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
            </div>
            <div class="w3-section">
                <label>Adresse</label>
                <input class="w3-input"  type="text" required name="adresse" value={adresse} onChange={(e)=>{setAdresse(e.target.value)}}/>
              </div>
              <div class="w3-section">
                <label>Téléphone</label>
                <input class="w3-input"  type="text" required name="phone" value={phone} onChange={(e)=>{setPhone(e.target.value)}} />
              </div>
            <div class="w3-section">
              <label>Mot de passe</label>
              <input class="w3-input"  type="password" required name="pwd" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
            </div>
            <div class="w3-section">
                <label>Confirmer le mot de passe</label>
                <input class="w3-input"  type="password" required name="c_pwd" value={password2} onChange={(e)=>{setPassword2(e.target.value)}} />
              </div>
            <button type="submit" class="btn btn-secondary w3-right">S'inscrire</button>
            <p>Vous avez déjat un compte? <Link to="/connexion">Connectez-vous</Link></p>
          </form>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
}

export default Signup;