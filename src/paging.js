import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './main.css';

import Home from './Home';
import Register from './components/register';
import Login from './components/login'
import Profile from './components/profile'

import AuthService from './services/auth.service';
import AppContainer from './AppContainer';

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
        this.state = {login:false};
        this.checkLogin = this.checkLogin.bind(this);
    }
    componentDidMount()
    {
        this.checkLogin();
        //console.log('bye');
    }
    checkLogin(){
        if(localStorage.getItem("user") === null && this.state.login) this.setState({login:false});
        else if(localStorage.getItem('user') !== null && !this.state.login) this.setState({login:true});
    }
    render() {
        return (
            <div>
                <header className='el-header'>
                    <div className='headercontents'>
                        <Link to="/">
                            <button className='title'>PRECROWD</button>
                        </Link>
                        <div className='space'>
                        </div>
                        <AppContainer change={this.checkLogin}>
                            {console.log(this.state.login)}
                            {this.state.login && 
                                <div>
                                    <Link to="/password">
                                        <button className='header-right'>비밀번호 수정</button>
                                    </Link>
                                    <Link to="/">
                                        <button className='header-right' onClick={() => AuthService.logout()}>로그아웃</button>
                                    </Link>
                                </div>
                            }
                            {!this.state.login && 
                                <div>
                                    <Link to="/login">
                                        <button className='header-right'>로그인</button>
                                    </Link>
                                    <Link to="/register">
                                        <button className='header-right'>회원가입</button>
                                    </Link>
                                </div>
                            }
                        </AppContainer>
                    </div>
                </header>
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


            </div>
        );
    }
}

export default Paging;