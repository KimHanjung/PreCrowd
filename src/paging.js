import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { signIn } from './auth';
import AuthRoute from './AuthRoute';
import './main.css';

import Home from './Home';
import Register from './register';

import Admin from './admin/admin.js';
import manage_member from './admin/manage_member.js';
import password from './admin/password.js';
import create_task from './admin/create_task.js';
import manage_task from './admin/manage_task.js';
import task_statistics from './admin/task_statistics.js';

import Evaluate from './evaluate.js'

import Submit from './submit.js'


class Paging extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Route exact path="/" component={Home} />
                <Route path="/register" component={Register} />
                
                <Route path="/admin" component={Admin} />
                <Route path="/manage_member" component={manage_member} />
                <Route path="/password" component={password} />
                <Route path="/create_task" component={create_task} />
                <Route path="/manage_task" component={manage_task} />
                <Route path="/task_statistics" component={task_statistics} />

                <Route path="/evaluate" component={Evaluate} />
                <Route path="/submit" component={Submit} />


            </div>
        );
    }
}

export default Paging;