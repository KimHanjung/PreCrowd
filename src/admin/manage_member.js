import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../main.css';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {ID:'default'};
}

  render() {
    return (
        <>
        <body>
        <header className='el-header'>
            <div className='headercontents'>
            <Link to="/">
                <button className='title'>PRECROWD</button>
            </Link>
            <div className='space'>
            </div>
            <div className='welcome'>{this.state.ID}님 환영합니다!</div>
            <Link to="/password">
                <button className='header-right'>비밀번호 수정</button>
            </Link>
            <Link to="/">
                <button className='header-right'>로그아웃</button>
            </Link>
            </div>
        </header>
        </body>
        <div className='menu'>
            asdfasdfasds
        </div>
        </>
       
    );
  }
}
export default Admin;
