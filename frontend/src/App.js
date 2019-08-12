import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Home from './pages/home'
import CreateOrder from './pages/createOrder'
import RespondToOrder from './pages/respondToOrder'

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home}></Route>
      <Route path="/create-order" exact component={CreateOrder} />
      <Route path="/respond-to-order" exact component={RespondToOrder} />
      {/* by default -- redirect to DEX home page ?*/}
    </BrowserRouter>
  );
}

export default App;
