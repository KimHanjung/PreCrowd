import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Select from "react-validation/build/select";

import UserService from "../services/user.service";
import ReactFlexyTable from 'react-flexy-table';
import 'react-flexy-table/dist/index.css';
import axios from 'axios';

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
const vScore = (value) => {
  if (parseInt(value) < 0 || parseInt(value) > 100) {
    return (
      <div className="alert alert-danger" role="alert">
        Pass cut line must be 0 ~ 100
      </div>
    );
  }
};

const Popup = (props) => {
const form1 = useRef();

const checkBtn1 = useRef();

const [tname, setTname] = useState(props.value);

const [file_index, setFile_Index] = useState(0);
const [pass, setPass] = useState(0);
const [score, setScore] = useState(0);
const [message1, setMessage1] = useState("");
const [successful1, setSuccessful1] = useState(false);


const URL = "http://localhost:3001/src/api/download?file_index=" + file_index;

const onChangeScore = (e) =>{
    const score = e.target.value;
    setScore(score);
}

const onChangePass = (e) =>{
    const pass = e.target.value;
    setPass(pass);
}


useEffect(() => {
    setFile_Index(props.File_index);
    console.log(file_index);
    
    
    

//     UserService.get_approval(props.value).then(
//       (response) => {
//         if (response.length === 0){
//           setData([{Id:'Empty',Name:'Empty',Score:'Empty',Status:0}])
//         }
//         else{
//         setData(response);
//         console.log(response);
//         }
//       },
//       (error) => {
//         const resMessage =
//           (error.response &&
//             error.response.data &&
//             error.response.data.message) ||
//           error.message ||
//           error.toString();
//         alert(resMessage);
//       }
//     );
  },[file_index]);

  const handleRegister1 = (e) => {
    e.preventDefault();

    setMessage1("");
    setSuccessful1(false);

    form1.current.validateAll();
    if (checkBtn1.current.context._errors.length === 0) {
    axios.post("http://localhost:3001/src/api/pass", {
        file_index: file_index.File_index,
        pass: pass,
        user_score: score
    })
      .then(
        (response) => {
          alert("success!");
          setMessage1(response.data.message);
          setSuccessful1(true);
        })
        .catch(
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setMessage1(resMessage);
          setSuccessful1(false);
        }
      );
    }
  };

  return createPortal(
    <div className='modalSheet'>
      <div className='modalContent'>   
        <div className='task_popup_form'>
        <div className='formcontainer'>
        <Form onSubmit={handleRegister1} ref={form1}>
            <div>
                <a href = {URL}><button type = 'button' className="evalDownButton">Download</button></a>
              <div className="form-group">
                <label htmlFor="Task name">Score</label>
                <Input
                  type="text"
                  className="form-control"
                  name="score"
                  value={score}
                  onChange={onChangeScore}
                  validations={[required, vScore]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="gender">Pass/Nonpass<br/></label>
                <Select name='gender' value={pass} onChange={onChangePass}>
                  <option value={Number(1)}>Pass</option>
                  <option value={Number(0)}>Nonpass</option>
                </Select>
              </div>
              <div className="form-group">
                <button className="btn btn-outline-success btn-block">Add</button>
              </div>
            </div>
            {message1 && (
            <div className="form-group">
              <div
                className={ successful1 ? "alert alert-success" : "alert alert-danger" }
                role="alert"
              >
                {message1}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn1} />
        </Form>
        </div>
        
        </div>
        <div className='right'>
        <button className='btn btn-secondary' onClick={props.onClick}>Back</button>
        </div>
      </div>
    </div>,
    document.getElementById("modal_root"),
  );
}
export default Popup;