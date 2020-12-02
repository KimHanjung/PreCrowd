import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

import UserService from "../services/user.service";
import {useHistory} from "react-router-dom";
import ReactFlexyTable from 'react-flexy-table';
import 'react-flexy-table/dist/index.css';

const modalStyle = {
  position: "fixed",
  left: 0,
  top: 0,
  bottom: 0,
  right: 0,
  backgroundColor: "rgba(255,255,255,0.9)",
  color: "##FFF",
};
const Popup = (props) => {

const history = useHistory();
const [tname, setTname] = useState(props.value)
const [data, setData] = useState([
  {
    Id: 'dafault',
    Name: 'dafault',
    Score: 0,
    Status: 0,
  }
]);

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
      <button className='btn btn-secondary' onClick={()=>{toggle(data.Id, data.Status)}}>
        {data.Status ? 'Reject': 'Approve'}
      </button>
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

  return createPortal(
    <div style={modalStyle}>
      <div
          style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: '100%',
          }}
      >   
        <ReactFlexyTable data={data} columns={columns} filterable nonFilterCols={["Action"]} globalSearch />
        <button className='btn btn-primary' >withdrawal</button>
        <button className='btn btn-primary' onClick={props.onClick}>Back</button>
      </div>
    </div>,
    document.getElementById("modal_root"),
  );
}
export default Popup;