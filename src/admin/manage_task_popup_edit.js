import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import UserService from "../services/user.service";
import ReactFlexyTable from 'react-flexy-table';
import 'react-flexy-table/dist/index.css';

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
const vPass = (value) => {
  if (parseInt(value) < 0 || parseInt(value) > 100) {
    return (
      <div className="alert alert-danger" role="alert">
        Pass cut line must be 0 ~ 100
      </div>
    );
  }
};
const vOriginalname = (value) => {
  if (value.length < 1 || value.length > 30) {
    return (
      <div className="alert alert-danger" role="alert">
        Original data type name must be less than 30 characters.
      </div>
    );
  }
};
const vOriginalschema = (value) => {
  if (value.length < 1 || value.length > 100) {
    return (
      <div className="alert alert-danger" role="alert">
        Table schema must be less than 100 characters.
      </div>
    );
  }
};

const Popup = (props) => {
const form1 = useRef();
const form2 = useRef();
const checkBtn1 = useRef();
const checkBtn2 = useRef();

const [tname, setTname] = useState(props.value);
const [pass, setPass] = useState(props.pass);

const [originalname, setOriginalname] = useState("");
const [originalschema, setOriginalschema] = useState("");
const [successful1, setSuccessful1] = useState(false);
const [message1, setMessage1] = useState("");
const [successful2, setSuccessful2] = useState(false);
const [message2, setMessage2] = useState("");

const [data, setData] = useState([
  {
    Id: 'dafault',
    Name: 'dafault',
    Score: 0,
    Status: 0,
  }
]);

const onChangePass = (e) => {
  const pass = e.target.value;
  setPass(parseInt(pass));
};

const onChangeOriginalname = (e) => {
  const originalname = e.target.value;
  setOriginalname(originalname);
};

const onChangeOriginalschema = (e) => {
  const originalschema = e.target.value;
  setOriginalschema(originalschema);
};


const columns=[
  {
    header: 'Id',
    key: 'Id',
    td: (data) => <div>{data.Id}</div>,
  },
  {
    header: 'User name',
    key: 'User_name',
    td: (data) => <div>{data.Name}</div>,
  },
  {
    header: 'Score',
    key: 'Score',
    td: (data) => <div>{data.Score}</div>,
  },
  {
    header: 'Status',
    key: 'Status',
    td: (data) => <div>{data.Status ? 'Approved': 'Not approved'}</div>,
  },
  {
    header: 'Action',
    key: 'Action',
    td: (data) => 
    <div>
      {/* {(data.Id==='Empty' || data.Id==='Default') ? */}
      <button className='btn btn-outline-success' onClick={()=>{toggle(data.Id, data.Status)}}>
        {data.Status ? 'Reject': 'Approve'}
      </button>
      {/* :<></>} */}
    </div>,
  },
]

const toggle = (id,status) =>{
  UserService.modify_approval(id, tname, status).then(
    (response) => {
      console.log(response);
      UserService.get_approval(tname).then(
        (response) => {
          if (response.length === 0){
            setData([{Id:'Empty',Name:'Empty',Score:'Empty',Status:0}])
          }
          else{
            setData(response);
            console.log(response);
          }
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          alert(resMessage);
        }
      );
    },
    (error) => {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      alert(resMessage);
    }
  );
};

useEffect(() => {
    UserService.get_approval(props.value).then(
      (response) => {
        if (response.length === 0){
          setData([{Id:'Empty',Name:'Empty',Score:'Empty',Status:0}])
        }
        else{
        setData(response);
        console.log(response);
        }
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        alert(resMessage);
      }
    );
  },[]);

  const handleRegister1 = (e) => {
    e.preventDefault();

    setMessage1("");
    setSuccessful1(false);

    form1.current.validateAll();
    if (checkBtn1.current.context._errors.length === 0) {
      UserService.create_original(originalname,originalschema,tname)
      .then(
        (response) => {
          console.log(response.data.message);
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

  const handleRegister2 = (e) => {
    e.preventDefault();

    setMessage2("");
    setSuccessful2(false);

    form2.current.validateAll();
    if (checkBtn2.current.context._errors.length === 0) {
      UserService.set_pass(pass, tname)
      .then(
        (response) => {
          console.log(response.data.message);
          setMessage2(response.data.message);
          setSuccessful2(true);
          alert(tname+': pass cut line changed to '+pass)
        })
        .catch(
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setMessage2(resMessage);
          setSuccessful2(false);
        }
      );
    }
  };

  return createPortal(
    <div className='modalSheet'>
      <div className='modalContent'>   
        <ReactFlexyTable className='rft' data={data} columns={columns} globalSearch />
        <hr color='green' size='10px'/>
        <div className='task_popup_form'>
        <div className='formcontainer'>
        <Form onSubmit={handleRegister1} ref={form1}>
            <div>
              <div className="form-group">
                <label htmlFor="Task name">Original data type name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="Ori_name"
                  value={originalname}
                  onChange={onChangeOriginalname}
                  validations={[required, vOriginalname]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="Task name">Original data type schema</label>
                <Input
                  type="text"
                  className="form-control"
                  name="Ori_schema"
                  value={originalschema}
                  onChange={onChangeOriginalschema}
                  validations={[required, vOriginalschema]}
                />
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
        <div className='formcontainer'>
        <Form onSubmit={handleRegister2} ref={form2}>
            <div>
              <div className="form-group">
                <label htmlFor="Task name">Pass cut line</label>
                <Input
                  type="text"
                  className="form-control"
                  name="pass"
                  onChange={onChangePass}
                  validations={[required, vPass]}
                />
              </div>
              <div className="form-group">
                <button className="btn btn-outline-success btn-block">Modify</button>
              </div>
            </div>
            {message2 && (
            <div className="form-group">
              <div
                className={ successful2 ? "alert alert-success" : "alert alert-danger" }
                role="alert"
              >
                {message2}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn2} />
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