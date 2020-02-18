import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/home";
import CreateOrder from "./pages/createOrder";
import GetOrderData from "./pages/getOrderData";
import RespondToOrder from "./pages/respondToOrder";
import LockAddress from "./pages/lockAddress";
import Refund from "./pages/refund";
import Claim from "./pages/claim";
import AppLayout from "./layout";

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Route path="/" exact component={Home}></Route>
        <Route path="/order-data" exact component={GetOrderData} />
        <Route path="/create-order" exact component={CreateOrder} />
        <Route path="/respond-to-order" exact component={RespondToOrder} />
        <Route path="/lock-address" exact component={LockAddress} />
        <Route path="/refund" exact component={Refund} />
        <Route path="/claim" exact component={Claim} />
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
