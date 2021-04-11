import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react'
import { Link, Route, Switch, withRouter } from 'react-router-dom'
import Login from './components/login/Login'
import CreateAccounts from './components/createAccount/CreateAccount'
import Main from './components/main/Main'
import ProtectedRoute from './components/protectedRoutes/ProtectedRoutes.js'


export default class App extends React.Component {

  render(){
    return (
    <div className="App">
          <Switch>
            <Route exact path='/' render={(props)=><Login {...props}/>}/>
            <Route exact path='/createAccounts' render={(props)=><CreateAccounts {...props}/>}/>
            <ProtectedRoute
              exact
              path='/memories' 
              component={Main}
            />
          </Switch>
      </div>
    );
  }
  
}
