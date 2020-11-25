import React, { useState, useEffect } from 'react';
import { Link, Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import { signIn } from './auth';

import Home from './Home';
import Register from './components/register';
import Profile from './Profile';
import Login from './components/login';
import LogoutButton from './LogoutButton';
import Admin from './admin/admin.js';
import './main.css'

function Main() {
  const [user, setUser] = useState(null);
  const authenticated = user != null;

  const login = ({ email, password }) => setUser(signIn({ email, password }));
  const logout = () => setUser(null);

  return (

    <Router>
            <body>
        <header className='el-header'>
            <div className='headercontents'>
            <Link to="/">
                <button className='title'>PRECROWD</button>
            </Link>
            </div>
        </header>
        
        <Route exact path="/" component={Home} />
        
        <Route path="/register" component={Register} />
        <Route
            path="/login"
            render={props => (
            <LoginForm authenticated={authenticated} login={login} {...props} />
            )}
        />

        </body>
    </Router>
    
  );
}

export default Main;
