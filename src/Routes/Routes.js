import { Switch, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Signup from '../Pages/Signup';
import Page404 from '../Pages/Page404';
import AuctionSaleJoin from '../Pages/AuctionSale/AuctionSaleJoin';
import Sale from '../Pages/AuctionSale/Sale';
import DashBord from '../Pages/Dash-Admin/index';
import UserInfo from '../Pages/Dash-Admin/UserInfo';
import AddSale from '../Pages/Dash-Admin/AddSale';
import EditSale from '../Pages/Dash-Admin/EditSale';
import SaleList from '../Pages/Dash-Admin/SaleList';

function Routes({user}) {
  return (
    <div className="">
        <Switch>
          <Route exact path="/">
              <Home user={user}/>
          </Route>
          <Route path="/connexion" user={user}>
              <Login />
          </Route>
          <Route  path="/inscription">
              <Signup />
          </Route>
          <Route  path="/joindre">
              <AuctionSaleJoin user={user}/>
          </Route>
          <Route  path="/vente/:id_vente">
              <Sale user={user}/>
          </Route>
          <Route exact path="/admin">
              <DashBord user={user}/>
          </Route>
          <Route  path="/admin/modifier_vente/:id_sale" >
              <EditSale user={user}/>
          </Route>
          <Route  path="/admin/nouvelle_vente" >
              <AddSale user={user}/>
          </Route>
          <Route  path="/admin/utilisateur/:username" >
              <UserInfo user={user}/>
          </Route>
          <Route  path="/admin/vente">
              <SaleList />
          </Route>
          <Route path="*">
              <Page404 />
          </Route>
        </Switch>
    </div>
  );
}

export default Routes;
