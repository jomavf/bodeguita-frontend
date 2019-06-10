import React, {Component} from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import './App.css';

import AuthPage from './pages/Auth'
import ProductPage from './pages/Product'
import HomePage from './pages/Home'
import MainNavigation from './components/Navigation/MainNavigation'
import AuthContext from './context/auth-context'
import EditProductPage from './pages/EditProduct'
import CreateProductPage from './pages/CreateProduct'

class App extends Component {
  state = {
    token: null,
  }
  
  login = (token) => {
    this.setState({token})
  }

  logout = () => {
    this.setState({token:null})
  }

  render(){
    return (
      <BrowserRouter className="App">
        <React.Fragment>
          <AuthContext.Provider value={{token: this.state.token,login:this.login,logout:this.logout}}>
            <MainNavigation/>
            <main className="main-content">
              <Switch>
                {!this.state.token && <Redirect from="/" to="/auth" exact></Redirect>}
                {!this.state.token && <Redirect from="/products" to="/auth" exact></Redirect>}
                {!this.state.token && <Route path="/auth" component={AuthPage}></Route>}
                {this.state.token && <Route path="/home" component={HomePage}></Route>}
                {this.state.token && <Route path="/products" component={ProductPage}></Route>}
                {this.state.token && <Route path="/create" component={CreateProductPage}></Route>}
                {this.state.token && <Route path="/edit/:id" component={EditProductPage}></Route>}
              </Switch>
            </main>
          </AuthContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
