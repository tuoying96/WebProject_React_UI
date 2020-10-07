import React, {lazy } from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Switch, Route, withRouter} from 'react-router-dom'
import {Provider} from 'react-redux'

import store from './redux/store'
import Login from './containers/login/login'
import Register from './containers/register/register'

import Main from './containers/main/main'

import './assets/css/index.less'
// import './test/socketio_test'

// const Login = withRouter(lazy(() => import('./containers/login/login')));
// const Register = withRouter(lazy(() => import('./containers/register/register')));

ReactDOM.render((
    <Provider store = {store}>
        <HashRouter>
            <Switch>
                <Route path="/register" component={(Register)}/>
                <Route path="/login" component={Login}/>
                <Route component={Main}></Route>  {/* default component*/}
            </Switch>
        </HashRouter>
    </Provider>
), document.getElementById('root'))
