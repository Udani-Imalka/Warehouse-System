//import React, {Component} from 'react';

import { BrowserRouter, Route, Switch } from "react-router-dom";
import Brand from "./Component/Brand";
import Category from "./Component/Category";
import ProductList from "./Component/ProductList";
import Recode from "./Component/Recode";
import Unit from "./Component/Unit";
import Dashboard from "./Component/Dashboard";
import StoreLocation from "./Component/StoreLocation";
import Expenses from "./Component/Expenses";
import ExpenseType from "./Component/ExpenseType";
import PaymentList from "./Component/PaymentList";
import PaymentType from "./Component/PaymentType";
import Cheque from "./Component/Cheque";
import Purchase from "./Component/Purchase";
import GRN from "./Component/GRN";
import GRNcart from "./Component/GRNcart";
import Innvoice from "./Component/Innvoice";
import User from "./Component/User";
import Supplier from "./Component/Supplier";
import ProductVariation from "./Component/Product_Varation";


function App() {
  return (
    <>
    <BrowserRouter>
      <Switch>
        <Route path="/productList">
          <ProductList />
        </Route>
        <Route path="/productVariation">
          <ProductVariation />
        </Route>
        <Route path="/category">
          <Category />
        </Route>
        <Route path="/unit">
          <Unit />
        </Route>
        <Route path="/brand">
          <Brand />
        </Route>
        <Route path="/recode">
          <Recode />
        </Route>
        <Route path="/storelocation">
          <StoreLocation />
        </Route>
        <Route path="/expenses">
          <Expenses />
        </Route>
        <Route path="/expensetype">
          <ExpenseType />
        </Route>
        <Route path="/paymentList">
          <PaymentList />
        </Route>
        <Route path="/paymentType">
          <PaymentType />
        </Route>
        <Route path="/cheque">
          <Cheque />
        </Route>
        <Route path="/purchase">
          <Purchase />
        </Route>
        <Route path="/grnList">
          <GRN />
        </Route>
        <Route path="/grnCart">
          <GRNcart />
        </Route>
        <Route path="/innvoice">
          <Innvoice />
        </Route>
        <Route path="/user">
          <User />
        </Route>
        <Route path="/supplier">
          <Supplier />
        </Route>
        <Route path="/">
          <Dashboard />
        </Route>
      </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;
