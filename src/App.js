import React from "react";
import { Route, Switch } from 'react-router-dom';

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
  return (
    <main>
      <Navigation/>
      <Switch>
        <Route path="/" component={ProductList} exact />
        <Route path="/products" component={ProductList}/>
        <Route path="/product/:productId" component={ViewProduct} />
        <Route path="/orders" component={OrderList} />
        <Route path="/order/:orderId" component={Order} />
        <Route path='/auth' component={Auth} />
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