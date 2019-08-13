import React from 'react';
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import Home from './pages/home'
import Orderbook from './pages/orderbook'
import CreateOrder from './pages/createOrder'
import RespondToOrder from './pages/respondToOrder'
import AppLayout from './layout'

function App() {
  return (
    <BrowserRouter>
    <AppLayout>
        <Route path="/" exact component={Home}></Route>
        <Route path="/orderbook" exact component={Orderbook} />
        <Route path="/create-order" exact component={CreateOrder} />
        {/* orderbook */}
        <Route path="/respond-to-order" exact component={RespondToOrder} />
        {/* by default -- redirect to DEX home page ?*/}
    </AppLayout>
    </BrowserRouter>
  );
}

export default App;