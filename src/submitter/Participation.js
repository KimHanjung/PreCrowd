//3
import React, { Component } from 'react'
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { Alert } from 'bootstrap';
import imgfile from './SignIn.jpg';
class Participation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            task_name: this.props.location.state.taskname
        };
        this.handleCheckbox = this.handleCheckbox.bind(this)
    }


    handleCheckbox = (e) => {
        const { target: { checked } } = e;
        this.setState({ checked });
    };
    handlePost(){
        const formData = new FormData();
        
        const Myuser = JSON.parse(localStorage.getItem("user"));
        const user_id = Myuser.id;

        const TaskName = this.state.task_name;
        
        return axios.post("/src/api/taskreq", {
            user_id,
            TaskName
        }).then(res => {
            alert('success')
        }).catch(err => {
            alert('fail')
        })
    }

    render() {
        const myjson = JSON.parse(localStorage.getItem("user"));
        return (
            
            <main>
             <h2>Hi, {myjson.id}</h2>
             <h2>{this.props.location.state.taskname}</h2>
             <img src={imgfile} />
            <h1>Do you agree?</h1>
            <input
                type="checkbox"
                checked={this.state.checked}
                onChange={this.handleCheckbox}
                />


            <Link to='/submitter/submit_apply'>
                    <button
                        disabled={!this.state.checked}
                        onClick={() => this.handlePost()}
                    >
                        Apply?
                    </button>
            </Link>
            </main>
        );
    }
}

export default Participation;