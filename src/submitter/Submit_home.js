//1
import React from 'react';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import "../main.css";
import { Link } from 'react-router-dom';
function Submit_home({ history }) {


    const handleTask = () => {
        history.push('/submitter/tasklist')
    }

    return (
        <body>
            <div className='home'>
            <div className='wise'>
                <pre className='pre'>지식은 모일수록 가치있다.
                    <br/>-???-
                </pre>
            </div>
            <div className='mainSelect'>
                <Link to="/submitter/tasklist">
                    <button className='mainbutton'>테스크 신청</button>
                </Link>
                <Link to="/submitter/submit_apply">
                    <button className='mainbutton'>승인된 테스크</button>
                </Link>
            </div>
        </div>


        </body>
        
        )
}     

export default withRouter(Submit_home)