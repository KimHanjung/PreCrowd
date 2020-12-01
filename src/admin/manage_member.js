import React, { Component, useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Select from "react-validation/build/select";
//import { isEmail } from "validator";

import AuthService from "../services/auth.service";
import { useHistory } from "react-router-dom";

var list= [];
var j = 0;
const Manage = (props) => {
  const history = useHistory();
  const form = useRef();
  const checkBtn = useRef();

  const [id, setId] = useState("");
  const [gender, setGender] = useState("");
  const [byear, setYear] = useState("");
  const [role, setRole] = useState("");
  const [user, setUser] = useState("");

 

  const onChangeId = (e) => {
    const id = e.target.value;
    setId(id);
  };
  const write  = () => {
    var list2 = [];
    while(j<list.length){
      list2.push(
      <tr>
        <td>{list[j].Id}</td>
        <td>{list[j].Pw}</td>
        <td>{list[j].Name}</td>
        <td>{list[j].Bdate}</td>
        <td>{list[j].Gender}</td>
        <td>{list[j].Phone}</td>
        <td>{list[j].Address}</td>
        <td>{list[j].Role}</td>
        <td>{list[j].createdAt}</td>
        <td>{list[j].updatedAt}</td>
      </tr>);
      j = j + 1;
    }
    return (
      {list2}
    );
  };
  const onChangeGender = (e) => {
    const gender = e.target.value;
    setGender(gender);
    
  }

  const onChangeByear = (e) => {
    const byear = e.target.value;
    setYear(byear);
  }


  
  

  const onChangeRole = (e) => {
    const role = e.target.value;
    setRole(role);
  }

  const handleRegister = (e) => {
    e.preventDefault();

    form.current.validateAll();
    
      AuthService.management(id, gender, byear, byear, role).then(
        (response) => {
          setUser(response);
          console.log('response: ', response[0].Id);
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
      console.log(user);
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

              <div className="form-group">
                <label htmlFor="gender">Gender<br/></label>
                <Select name='gender' value={gender} onChange={onChangeGender}>
                  <option value=''>Gender</option>
                  <option value='M'>Man</option>
                  <option value='F'>Female</option>
                </Select>
              </div>

              <div className="form-group">
                <label htmlFor="byear1">Birthyear1</label>
                <Input
                  type="text"
                  className="form-control"
                  name="byear1"
                  placeholder = "YYYY"
                  value={byear}
                />
              </div>
              <div className="form-group">
                <label htmlFor="byear2">Birthyear2</label>
                <Input
                  type="text"
                  className="form-control"
                  name="byear2"
                  placeholder = "YYYY"
                  value={byear}
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
             <th>Pw</th>
             <th>Name</th>
             <th>Bdate</th>
             <th>Gender</th>
             <th>Phone</th>
             <th>Address</th>
             <th>Role</th>
             <th>createdAt</th>
             <th>updatedAt</th>
           </tr>
         </thead>
         <tbody>
         </tbody>
       </table>
      </div>
    </div>
  );
};

export default Manage;