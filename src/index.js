import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './pages/home';
import Login from './pages/login';
import Cadastrar from './pages/cadastrar';
import Eventos from './pages/eventos';
import NaoEncontrada from './pages/naoencontrada';
import reportWebVitals from './reportWebVitals';
import CrudCategorias from './pages/admin/crudcategorias';
import CrudEventos from './pages/admin/crudeventos';
import DashBoard from './pages/admin/dashboard';
import jwt_decode from 'jwt-decode';

import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

const RotaPrivada = ({component : Component, ...rest }) => (
  <Route
     {...rest}
     render = {
       props => 
       localStorage.getItem('token-nyous-tarde') === null ?
       <Redirect  to={{pathname :'/login', state : {from : props.location}}} /> :

       <Component {...props}/>
     }

  
  />
)

const RotaPrivadaAdmin = ({component : Component, ...rest }) => (
  <Route
     {...rest}
     render = {
       props => 
       localStorage.getItem('token-nyous-tarde') !== null && jwt_decode(localStorage.getItem('token-nyous-tarde')).role !== 'Admin' ?
       <Redirect  to={{pathname :'/login', state : {from : props.location}}} /> :

       <Component {...props}/>
     }

  
  />
)

const routing = (
  <Router>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/login' component={Login}/>
      <Route path='/cadastrar' component={Cadastrar}/>
      <RoutaPrivada path='/eventos' component={Eventos}/>
      <RoutaPrivadaAdmin path='/admin/dashboard' component={DashBoard}/>
      <RoutaPrivadaAdmin path='/admin/categorias' component={CrudCategorias}/>
      <RoutaPrivadaAdmin path='/admin/eventos' component={CrudEventos}/>
      <Route component={NaoEncontrada}/>
    </Switch>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
