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
        
        <div className='home'>
            <div className='wise'>
                <pre>지식은 모일수록 가치있다.
                    <br/>-???-
                </pre>
            </div>
            <div className='mainSelect'>
                <Link to="/create_task">
                    <button className='mainbutton'>태스크 생성</button>
                </Link>
                <Link to="/manage_task">
                    <button className='mainbutton'>태스크 관리</button>
                </Link>
                <Link to="/task_statistics">
                    <button className='mainbutton'>태스크 통계</button>
                </Link>
                <Link to="/manage_member">
                    <button className='mainbutton'>회원 관리</button>
                </Link>
            </div>
        </div>
        </body>
    );
  }
}
export default Admin;
