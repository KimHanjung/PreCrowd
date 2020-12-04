import React, { useState, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import ReactFlexyTable from 'react-flexy-table';
import 'react-flexy-table/dist/index.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import axios from 'axios';
import PopupScore from './popupscore';
import { Route, Link } from "react-router-dom";


const Monitorscore = (props) => {
  const [data, setData] = useState([
    {
      id: 0,
      Task_name: 'dafault',
      Term: 0,
      Desc: 'dafault',
    }
  ]);

  const passOrNonpass = (pass) =>{
    if(pass === 1){
      return "Pass";
    }
    else{
      return "Nonpass";
    }
  }




  const columns=[
    {
      header: 'File name',
      key: 'File name',
      td: (data) => <div>{data.Parsing_file_name}</div>,
    },
    {
      header: 'Score',
      key: 'Score',
      td: (data) => <div>{data.User_score}</div>,
    },
    {
      header: 'Pass/Nonpass',
      key: 'Pass',
      td: (data) => <div>{passOrNonpass(data.Pass)}</div>,
    },
  ]

  useEffect(async () => {
    const myjson = JSON.parse(localStorage.getItem("user"));
    const URL = "http://localhost:3001/src/api/ratestate?id=" + myjson.id;
    console.log(URL); 
    let response = await axios.get(URL);
    response = response.data;
    setData(response);
    console.log(response);
  },[]);


  return (
    <div className='white'>
      <ReactFlexyTable title='Task Management' data={data} columns={columns}/>
    </div>
  );
};

export default Monitorscore;