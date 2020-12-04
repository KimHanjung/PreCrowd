import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../main.css';

class Scorer extends Component {
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
                    <button className='mainbutton'>파싱 데이터 시퀀스 파일 평가하기</button>
                </Link>
                <Link to="/manage_task">
                    <button className='mainbutton'>평가 내역 모니터링</button>
                </Link>
                <Link to="/task_statistics">
                    <button className='mainbutton'>제출자의 평가 점수 관리하기</button>
                </Link>
            </div>
        </div>
        </body>
    );
  }
}
export default Scorer;
