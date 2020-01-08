import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/home";
import CreateOrder from "./pages/createOrder";
import RespondToOrder from "./pages/respondToOrder";
import AppLayout from "./layout";

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Route path="/" exact component={Home}></Route>
        <Route path="/create-order" exact component={CreateOrder} />
        <Route path="/respond-to-order" exact component={RespondToOrder} />
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
