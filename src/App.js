import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import './App.css';

import AuthPage from './pages/Auth'
import ProductPage from './pages/Product'
import CategoryPage from './pages/Category'
import MainNavigation from './components/Navigation/MainNavigation'

function App() {
  return (
    <BrowserRouter className="App">
      <React.Fragment>
        <MainNavigation/>
        <main className="main-content">
          <Switch>
            <Redirect from="/" to="/auth" exact></Redirect>
            <Route path="/auth" component={AuthPage}></Route>
            <Route path="/products" component={ProductPage}></Route>
            <Route path="/categories" component={CategoryPage}></Route>
          </Switch>
        </main>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
