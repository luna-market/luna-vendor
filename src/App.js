import React, { useState } from "react";
import { Route, Switch } from 'react-router-dom';
import { AUTH_TOKEN } from './constants'

import Navigation from './components/Navigation/Navigation'
import ProductList from './containers/Product/ProductList'
import ViewProduct from './containers/Product/ViewProduct'
import Error from './containers/Error'
import Auth from './containers/Auth'
import AddProduct from './containers/Product/AddProduct'
import Profile from './containers/Profile'
import OrderList from './containers/Order/OrderList'
import Order from './containers/Order/Order'

function App() {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  const [loggedIn, setLoggedIn] = useState(authToken ? true : false)

  return (
    <main>
      <Navigation loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Switch>
        <Route path="/" component={ProductList} exact />
        <Route path="/products" component={ProductList} />
        <Route path="/product/:productId" component={ViewProduct} />
        <Route path="/orders" component={OrderList} />
        <Route path="/order/:orderId" component={Order} />
        <Route path='/auth' ><Auth loggedIn={loggedIn} setLoggedIn={setLoggedIn} /></Route>
        <Route path='/add' component={AddProduct} />
        <Route path='/profile' component={Profile} />
        <Route path='/err' component={Error} />
        <Route component={Error} />
      </Switch>
      {/* <Hints/> */}
    </main>
  );
};

export default App;