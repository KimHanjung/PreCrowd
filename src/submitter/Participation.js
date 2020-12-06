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

        const task_name = this.state.task_name;
        
        return axios.post("http://localhost:3001/src/api/taskreq", {
            user_id,
            task_name
        }).then(res => {
            alert('success')
        }).catch(err => {
            alert('fail')
        })
    }

    render() {
        const myjson = JSON.parse(localStorage.getItem("user"));
        console.log(myjson.id);
        return (
            
            <div className="registercolumn">
            <div className="registercard">
             <h2 style={{
                 display:'inline-flex',
                 justifyContent:'center'
             }}>Hi,{myjson.id}. this is {this.props.location.state.taskname} </h2>
             <div style={{
                 display:'inline-flex',
                 justifyContent:'center'
             }}>
             <img src={imgfile} />
             </div>
            <h1>Do you agree?</h1>
            <input
                type="checkbox"
                checked={this.state.checked}
                onChange={this.handleCheckbox}
                />

                <Link to='/submit_apply'>
                    <button className='btn btn-primary'
                        disabled={!this.state.checked}
                        onClick={() => this.handlePost()}
                    >
                        Apply
                    </button>
                </Link>
            </div>
            </div>
        );
    }
}

export default Participation;
