import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Scorer extends Component {
  constructor(props) {
    super(props);
    this.state = {ID:'default'};
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
            <div className='welcome'>{this.state.ID}님 환영합니다!</div>
            <Link to="/password">
                <button className='header-right'>비밀번호 수정</button>
            </Link>
            <Link to="/">
                <button className='header-right'>로그아웃</button>
            </Link>
            </div>
        </header>
        
            <div className='mainSelect'>
                <Link to="/score_file">
                    <button className='mainbutton'>파싱 데이터 시퀀스 파일 평가하기</button>
                </Link>
                <Link to="/monitor_score">
                    <button className='mainbutton'>평가 내역 모니터링</button>
                </Link>

            </div>
        </div>
    );
  }
}
export default Scorer;
