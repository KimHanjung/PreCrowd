import React from "react";
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
import './main.css'

function Home() {
  return (
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
  );
}

export default Home;
