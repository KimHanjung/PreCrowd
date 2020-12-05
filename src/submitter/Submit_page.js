//5

import React, { useState, Component } from 'react'
import axios from 'axios';
import {post} from 'axios';
import Select from 'react-select';
import { Link} from 'react-router-dom';
class Submit_page extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            error: false,
            Loading:false,
            my_index:null,
            my_id: null,
            my_name:null,
            task_name: this.props.location.state.taskname,
            type_name: null,
            type_list: [],
            round: null,
            duration: null,
            selectedFile: null,
        };
        this.handleTypename = this.handleTypename.bind(this)
        this.handleRound = this.handleRound.bind(this)
        this.handleDuration = this.handleDuration.bind(this)
        this.handleFileInput = this.handleFileInput.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    fetchType = async () => {
        axios.get("http://localhost:3001/src/api/typelist",{
            params:{
                task_name: this.state.task_name
            }
        })
        .then(( response ) => {
            const data = response.data;
            const options = data.map((d,index) => ({
                "value": index,
                "label" : d.Type_name
          
              }))

            this.setState({type_list: options})
        })
        .catch(e => {
          console.error(e);
        });

    };

    handleChange(e){
        this.setState({my_id: e.value, my_name:e.label})
    }

    handleTypename(e){
        this.setState({
            type_name: e.target.value
        })
    }
    handleRound(e){
        this.setState({
            round: e.target.value
        })
    }
    handleFileInput(e){
        this.setState({
          selectedFile : e.target.files[0],
        })
      }

      handleDuration(e){
          this.setState({
              duration: e.target.value
          })
      }
    
      handleFormSubmit(e){
        e.preventDefault()
        this.handleSubmit()
        .then((response)=>{
            alert('success')
        })
      }


      handleSubmit(){
          const url ='http://localhost:3001/src/api/submit';
          const formData = new FormData();
          const Myuser = JSON.parse(localStorage.getItem("user"));
          const user_id = Myuser.id;
          formData.append('user_id', user_id);
          formData.append('type_name', this.state.my_name);
          formData.append('task_name', this.state.task_name);
          formData.append('round', this.state.round);
          formData.append('period', this.state.duration);
          formData.append('userfile', this.state.selectedFile);
          const config = {
              headers:{
                  'content-type': 'multipart/form-data'
              }
          }
          console.log(user_id);
          console.log(this.state.my_name);
          console.log(this.state.task_name);
          console.log(this.state.selectedFile);

          return post(url, formData, config)
      }



    handlePost=()=> {
        const Myuser = JSON.parse(localStorage.getItem("user"));
        const user_id = Myuser.id;
        const type_name = this.state.my_name;
        const task_name = this.state.task_name;
        const round = this.state.round;
        const period = this.state.duration;
        const userfile = this.state.selectedFile;
        const formData = new FormData();
        formData.append('user_id', user_id);
        formData.append('type_name', this.state.my_name);
        formData.append('task_name', this.state.task_name);
        formData.append('round', this.state.round);
        formData.append('period', this.state.duration);
        formData.append('usefile', this.state.selectedFile);
        console.log(user_id);
        console.log(type_name);
        console.log(task_name);
        console.log(round);
        console.log(period);
        console.log(userfile);
        return axios.post("http://localhost:3001/src/api/submit" ,formData,{
            headers:{
                'content-type': 'multipart/form-data'
            }
            
        }).then(res => {
            alert('success')
        }).catch(err => {
            alert('fails')
        })
    }

    componentDidMount(){
        this.fetchType()
    }

    render(){
        console.log(this.state.type_list)
        return (
            <div>
            <form name='accountfirm' onSubmit={this.handleFormSubmit}>
            <div className="registercard">
                <h1>{this.state.task_name}, hello</h1>
                <div className="form-group">
                <Select options={this.state.type_list} onChange={this.handleChange.bind(this)}>
                {this.state.my_name}
                </Select>
                </div>
                <p>You have selected <strong>{this.state.my_name}</strong></p>
                <input type="file" name="file" onChange={e => this.handleFileInput(e)} />
                <h1>Round</h1>
                <input type="text" name="Round" onChange={e => this.handleRound(e)} />
                <h1>Period</h1>
                <input type="text" name="Duration" onChange={e => this.handleDuration(e)}/>
                <button type='submit'>제출</button>

                
                </div>
                </form>
            </div>
        )
    }
    
    
}

export default Submit_page;