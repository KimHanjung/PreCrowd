//1
import React from 'react';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import "../main.css";
import { Link } from 'react-router-dom';
function Submit_home({ history }) {


    const handleTask = () => {
        history.push('/tasklist')
    }

    return (
        <div className='home'>
            <div className='wise'>
                <pre className='pre'>지식은 모일수록 가치있다.
                    <br/>-???-
                </pre>
            </div>
            <div className='mainSelect'>
                <Link to="/tasklist">
                    <button className='mainbutton'>태스크 신청</button>
                </Link>
                <Link to="/submit_apply">
                    <button className='mainbutton'>파일 제출</button>
                </Link>
                <Link to="/submit_monitoring">
                    <button className='mainbutton'>태스크 모니터링</button>
                </Link>
            </div>
        </div>
        )
}     

export default withRouter(Submit_home)