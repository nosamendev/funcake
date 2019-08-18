import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { authCheckState } from './store/actions/auth';
import Cart from './Layout/Cart/Cart';
import About from './Layout/About/About';
import Auth from './Layout/Auth/Auth';
import Products from './Layout/Products/Products';
import Layout from './Layout/Layout';
import MyOrders from './Layout/MyOrders/MyOrders';
import Logout from './Layout/Auth/Logout';
import './App.css';


const App = (props) => {

  useEffect(() => {
    props.authCheckState();
  },[])

  let routes = (
    //not authenticated:
    <Switch>
      <Route path="/cart" exact component={Cart} />
      <Route path="/" exact component={Products} />
      <Route path="/about" exact component ={About} />
      <Route path="/auth" exact component ={Auth} />
      <Redirect to="/" />     
      <Route render={() => <h1>(404) This file cannot be found</h1>} />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/cart" exact component={Cart} />
        <Route path="/" exact component={Products} />
        <Route path="/about" exact component ={About} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/auth" exact component ={Auth} />
        <Route path="/orders" exact component ={MyOrders} />
        <Route render={() => <h1>(404) This file cannot be found</h1>} />
      </Switch>
    );
  }

  return (
    <BrowserRouter>
      <Layout>
        {routes}
      </Layout>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authReducer.token !== null
  }
}

export default connect(mapStateToProps, { authCheckState })(App);
