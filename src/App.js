import React from "react";
import { Route, Switch } from 'react-router-dom';

import Navigation from './components/Navigation/Navigation'
import ProductList from './containers/ProductList'
import Product from './containers/Product'
import Error from './containers/Error'
import Auth from './containers/Auth'

function App() {
  return (
    <main>
      <Navigation/>
      <Switch>
        <Route path="/" component={ProductList} exact />
        <Route path="/product/:productId" component={Product} />
        <Route path='/auth' component={Auth} />
        {/* <Route path="/ProductPage/:productId" component={ProductPage}/>
        <Route path='/profile' component={Profile} />
        <Route path='/progress/:orderId' component={Progress} /> */}
        <Route component={Error} />
      </Switch>
      {/* <Hints/> */}
    </main>
  );
};

export default App;