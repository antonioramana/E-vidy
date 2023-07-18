import { Link,useHistory } from "react-router-dom";
import AuthServices from "../Services/authServices";

function NavBar() {
    const history=useHistory();
    const user=JSON.parse(localStorage.getItem("user"));
    const logout=()=>{
        AuthServices.logout();
        history.push("/connexion");
    }

    return (
        <header>
   
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <Link className="navbar-brand m-2" to="/"><i className="fa fa-shopping-cart"></i> E-vidy:<small className="w3-opacity">Application web pour une vente aux enchères</small></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-nav" aria-controls="main-nav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
             
                <div className="collapse navbar-collapse justify-content-end align-center" id="main-nav">
                    <ul className="navbar-nav me-5">
                        <li className="nav-item">
                            <Link to="/" className="nav-link"> <i class="fa fa-home"></i> Accueil</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/joindre" className="nav-link"><i class="fa fa-shopping-bag"></i> Joindre une vente</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/inscription" className="nav-link"><i class="fa fa-pen"></i> Inscription</Link>
                        </li>
                        { user && <> 
                     { user.roles=="admin" &&  <li className="nav-item">
                            <Link to="/admin/" className="nav-link"><i class="fa fa-calendar-alt"></i> DashBoard</Link>
                            </li>
                     } 
                     <li className="nav-item ">
                        <button onClick={logout} className="btn btn-secondary"> <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i> Déconnexion</button>
                    </li>
                     </>
                    }
                    { !user && <li className="nav-item ">
                        <Link to="/connexion" className="btn btn-dark">Connexion</Link>
                    </li>}
                    </ul>
                </div>
        </nav>
    </header>
    
  );
}

export default NavBar;
