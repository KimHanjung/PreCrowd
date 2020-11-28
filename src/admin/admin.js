import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../main.css';
import AuthService from '../services/auth.service';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {ID:'admin'};
} 

  render() {
    return (
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
    );
  }
}
export default Admin;
