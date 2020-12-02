import React, { Component, useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Select from "react-validation/build/select";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
//import { isEmail } from "validator";

import AuthService from "../services/auth.service";
import { useHistory } from "react-router-dom";

var listtask = [];
var list= [];
var subtask= [];
var evatask= [];
var j = 0;
var tasklist = [];
const Manage = (props) => {
  const history = useHistory();
  const form = useRef();
  const checkBtn = useRef();
  const initial = () => {
    
     AuthService.taketask().then(
      (response) =>{
        listtask = [];
        var x = 0;
        while(x<response.length){
          listtask.push(
            <option value ={response[x].Task_name}>{response[x].Task_name}</option>
          ); 
          x = x + 1;
        }
      }
     );
  };
  const confirm_sub = (e) => {
    confirmAlert({
      title: 'Show the statistics',
      message: 'Are you sure?',
      buttons: [
        {
          label:'Yes',
          onClick: () => alert(e)
        },
        {
          label: 'No',
        }
      ]
    });
  };
  const confirm_eva = (e) => {
    confirmAlert({
      title: 'Show the file list',
      message: 'Are you sure?',
      buttons: [
        {
          label:'Yes',
          onClick: () => alert(e)
        },
        {
          label: 'No',
        }
      ]
    });
  };
  const takesub = () => {
    AuthService.takesub(user_id).then(
      (response) =>{
        subtask = [];
        var y = 0;
        while(y<response.length){
          subtask.push(
            response[y]
          );
          y = y + 1;
        }
      }
    );
  };
  const takeeva = () => {
    AuthService.takeeva(user_id).then(
      (response) => {
        evatask = [];
        var z = 0;
        while(z<response.length){
          evatask.push(
            response[z]
          );
          z = z + 1;
        }
      }
    );
  };
  const [id, setId] = useState("");
  const [gender, setGender] = useState("");
  const [byear1, setYear1] = useState("");
  const [byear2, setYear2] = useState("");
  const [role, setRole] = useState("");
  const [user, setUser] = useState("");
  const [task, setTask] = useState("");
  const [listt, setList] = useState(initial);
  const [user_id, setUserid] = useState("");
  
  

  const onChangeId = (e) => {
    const id = e.target.value;
    setId(id);
  };
  
  const write  = () => {
    j = 0;
    list = [];
    while(j<user.length){
      setUserid(user[j].id);
      if(user[j].Role === "Submittor"){
        takesub();
        list.push(
          <tr onClick={()=>{{confirm_sub(subtask)}}}>
            <td>{user[j].Id}</td>
            <td>{user[j].Name}</td>
            <td>{user[j].Bdate}</td>
            <td>{user[j].Gender}</td>
            <td>{user[j].Phone}</td>
            <td>{user[j].Address}</td>
            <td>{user[j].Role}</td>
          </tr>);
      }
      else{
        takeeva();
        list.push(
          <tr onClick={()=>{{confirm_eva(evatask)}}}>
            <td>{user[j].Id}</td>
            <td>{user[j].Name}</td>
            <td>{user[j].Bdate}</td>
            <td>{user[j].Gender}</td>
            <td>{user[j].Phone}</td>
            <td>{user[j].Address}</td>
            <td>{user[j].Role}</td>
          </tr>);
      }
      j = j + 1;
    }
  };
  const onChangeGender = (e) => {
    const gender = e.target.value;
    setGender(gender);
    
  }

  const onChangeByear1 = (e) => {
    const byear1 = e.target.value;
    setYear1(byear1);
  }
  const onChangeByear2 = (e) => {
    const byear2 = e.target.value;
    setYear2(byear2);
  }
  const onChangeSelect = (e) => {
    const task = e.target.value;
    setTask(task);
  }


  
  

  const onChangeRole = (e) => {
    const role = e.target.value;
    setRole(role);
  }
  
  const handleRegister = (e) => {
    e.preventDefault();

    form.current.validateAll();
    
      AuthService.management(id,task, gender, byear1, byear2, role).then(
        (response) => {
          setUser(response);
          write();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

        }
      );
  };
  
  return (
    <div className="col-md-12">
      <div className="card card-container">
        <Form onSubmit={handleRegister} ref={form}>
          {
            <div>
              <div className="form-group">
                <label htmlFor="Id">Id</label>
                <Input
                  type="text"
                  className="form-control"
                  name="Id"
                  value={id}
                  onChange={onChangeId}
                />
              </div>
              <div className ="form-group">
                <label htmlFor="task">Task_list<br/></label>
                <Select name ="task" value ={task} onChange={onChangeSelect}>
                  <option value = "">Task_List</option>
                  {listtask}
                </Select>
              </div>
              <div className="form-group">
                <label htmlFor="gender">Gender<br/></label>
                <Select name='gender' value={gender} onChange={onChangeGender}>
                  <option value={Number(-1)}>Gender</option>
                  <option value={Number(1)}>Male</option>
                  <option value={Number(0)}>Female</option>
                </Select>
              </div>

              <div className="form-group">
                <label htmlFor="byear1">Birthyear1</label>
                <Input
                  type="text"
                  className="form-control"
                  name="byear1"
                  placeholder = "YYYY"
                  onChange={onChangeByear1}
                  value={byear1}
                />
              </div>
              <div className="form-group">
                <label htmlFor="byear2">Birthyear2</label>
                <Input
                  type="text"
                  className="form-control"
                  name="byear2"
                  placeholder = "YYYY"
                  onChange={onChangeByear2}
                  value={byear2}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="role">Role<br/></label>
                <Select name='role' value={role} onChange={onChangeRole}>
                  <option value='r'>Role</option>
                  <option value='Submittor'>Submittor</option>
                  <option value='Evaluationer'>Evaluationer</option>
                </Select>
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Show members</button>
              </div>
            </div>
          }

          { (
            <div className="form-group">
              <div
                
                role="alert"
              >
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
      <div>
       <table>
         <thead>
           <tr>
             <th>Id</th>
             <th>Name</th>
             <th>Bdate</th>
             <th>Gender</th>
             <th>Phone</th>
             <th>Address</th>
             <th>Role</th>
           </tr>
         </thead>
         <tbody>
           {list}
         </tbody>
       </table>
      </div>
    </div>
  );
};

export default Manage;