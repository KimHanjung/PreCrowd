import React, { Component } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import './main.css';


class Home extends Component {
  constructor(props){
    super(props);
        this.state = {
            login: true,
            role: undefined,
        }
  }
  componentDidMount(){
      const member = (JSON.parse(localStorage.getItem("user")));
      if(member !== null) {
        if(member.role === 'Administrator') this.props.history.push('/admin');
        else if(member.role === 'Submittor') this.props.history.push('/submit');
        else if(member.role === 'Evaluationer') this.props.history.push('/evaluate');
      }
  }
  render() {
    return (
        <body>
            <header className='el-header'>
            <div className='headercontents'>
            <Link to="/">
                <button className='title'>PRECROWD</button>
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
                <Link to="/login">
                    <button className='mainbutton'>로그인</button>
                </Link>
                <Link to="/register">
                    <button className='mainbutton'>회원가입</button>
                </Link>
                </div>
            </div>
        </body>
        );
    }
}

    export default Home;
