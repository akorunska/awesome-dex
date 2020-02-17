import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/home";
import CreateOrder from "./pages/createOrder";
import GetOrderData from "./pages/getOrderData";
import RespondToOrder from "./pages/respondToOrder";
import Refund from "./pages/refund";
import AppLayout from "./layout";

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Route path="/" exact component={Home}></Route>
        <Route path="/create-order" exact component={CreateOrder} />
        <Route path="/order-data" exact component={GetOrderData} />
        <Route path="/refund" exact component={Refund} />
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
