import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Cart from './Layout/Cart/Cart';
import About from './Layout/About/About';
import Products from './Layout/Products/Products';
import './App.css';
import Layout from './Layout/Layout';

const App = () => {

  let routes = (
    <Switch>
      <Route path="/cart" exact component={Cart} />
      <Route path="/" exact component={Products} />
      <Route path="/about" exact component ={About} />
      <Route render={() => <h1>(404) This file cannot be found</h1>} />
    </Switch>
  );

  return (
    <BrowserRouter>
      <Layout>
        {routes}
      </Layout>
    </BrowserRouter>
  );
}

export default App;
