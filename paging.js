import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './main.css';

import Home from './Home';
import Register from './components/register';
import Login from './components/login'
import Profile from './components/profile'

import Admin from './admin/admin.js';
import manage_member from './admin/manage_member.js';
import password from './admin/password.js';
import create_task from './admin/create_task.js';
import manage_task from './admin/manage_task.js';
import task_statistics from './admin/task_statistics.js';

import Evaluate from './evaluate.js'

import Submit from './submit.js'

import Scorer from './scorer/scorer.js';
import score_file from './scorer/score_file.js';
import monitor_score from './scorer/monitor_score.js';
import manage_score from './scorer/manage_score';



class Paging extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Route exact path="/" component={Home} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/profile" component={Profile} />
                
                <Route path="/admin" component={Admin} />
                <Route path="/manage_member" component={manage_member} />
                <Route path="/password" component={password} />
                <Route path="/create_task" component={create_task} />
                <Route path="/manage_task" component={manage_task} />
                <Route path="/task_statistics" component={task_statistics} />

                <Route path="/evaluate" component={Evaluate} />
                <Route path="/submit" component={Submit} />

                <Route path="/scorer" component={Scorer} />
                <Route path="/score_file" component={score_file} />
                <Route path="/monitor_score" component={monitor_score} />
                <Route path="/manage_score" component={manage_score} />                

            </div>
        );
    }
}

export default Paging;