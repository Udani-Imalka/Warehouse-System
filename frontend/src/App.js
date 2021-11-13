import './App.css';
import Dashboard from './components/Dashboard';
import { Component, React } from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Supplier from './components/Supplier';
import User from './components/User';
import Login from './components/Login'
import POCart from './components/PurchaseOrder/POCart';
import POList from './components/PurchaseOrder/POList';
import GRNList from './components/GRN/GRNList';
import GRNCart from './components/GRN/GRNCart';
import Invoice from './components/GRN/Invoice';

class App extends Component{

  render(){
    return (
     <Router>
      <div className="App">
      
          <div className="content">
            <Switch>
              <Route exact path="/">
                <Login/>
              </Route>
              <Route exact path="/Dashboard">
                <Dashboard/>
              </Route>
              <Route path="/supplier">
                  <Supplier/>
              </Route>
              <Route path="/purchaseOrderCart">
                  <POCart/>
              </Route>
              <Route path="/purchaseOrderList">
                  <POList/>
              </Route>
              <Route path="/user">
                  <User/>
              </Route>
              <Route path="/GRNList">
                  <GRNList/>
              </Route>
              <Route path="/GRNCart">
                  <GRNCart/>
              </Route>
              <Route path="/GRNinvoice">
                  <Invoice/>
              </Route>
            </Switch>
          </div> 
      </div>

      </Router>
    );
}
}


export default App;
