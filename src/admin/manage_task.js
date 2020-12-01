import React, { useState, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import ReactFlexyTable from 'react-flexy-table';
import 'react-flexy-table/dist/index.css';

import UserService from "../services/user.service";
import { useHistory } from "react-router-dom";



const Managetask = () => {
  const [data, setData] = useState([
    {
      id: 0,
      Task_name: 'dafault',
      Term: 0,
      Desc: 'dafault',
      Task_data_table_name: 'dafault',
      Task_data_table_schema: 'dafault',
    }
  ]);

  const delete_task = (Task_name) => {
    alert(Task_name);
    UserService.delete_task(Task_name).then(
      (response) => {
        UserService.get_task().then(
          (response) => {
            let i = 0;
            while(i < response.length){
              response[i].id = i+1;
              i = i+1;
            }
            setData(response);
            console.log(response);
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
  
  const columns=[
    {
      header: 'id',
      key: 'id',
      td: (data) => <div>{data.id}</div>,
    },
    {
      header: 'Task name',
      key: 'Task_name',
      td: (data) => <div>{data.Task_name}</div>,
    },
    {
      header: 'term',
      key: 'Term',
      td: (data) => <div>{data.Term}</div>,
    },
    {
      header: 'desc',
      key: 'Desc',
      td: (data) => <div>{data.Desc}</div>,
    },
    {
      header: 'Task data table name',
      key: 'Task_data_table_name',
      td: (data) => <div>{data.Task_data_table_name}</div>,
    },
    {
      header: 'Task data table schema',
      key: 'Task_data_table_schema',
      td: (data) => <div>{data.Task_data_table_schema}</div>,
    },
    {
      header: 'Action',
      key: 'id',
      td: (data) => <button onClick={() => {delete_task(data.Task_name)}}>삭제</button>,
    },
  ]

  useEffect(() => {
    UserService.get_task().then(
      (response) => {
        let i = 0;
        while(i < response.length){
          response[i].id = i+1;
          i = i+1;
        }
        setData(response);
        console.log(response);
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


  return (
    <div className='white'>
      <ReactFlexyTable data={data} columns={columns} filterable globalSearch />
    </div>
  );
};

export default Managetask;