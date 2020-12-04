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


const Managetask = (props) => {
  const [data, setData] = useState([
    {
      id: 0,
      Task_name: 'dafault',
      Term: 0,
      Desc: 'dafault',
      Pass: 0,
      Task_data_table_name: 'dafault',
      Task_data_table_schema: 'dafault',
    }
  ]);

  const [file_index, setFile_index] = useState(0);


  const popUpScore = (fileindex) =>{
    setFile_index(fileindex);
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
      td: (data) => <div>{data.Score}</div>,
    },
    {
      header: 'Pass',
      key: 'Pass',
      td: (data) => <div>{data.Pass}</div>,
    },
  ]

  useEffect(async () => {
    // const myjson = JSON.parse(localStorage.getItem("user"));
    // const URL = "URL" + myjson.id;
    // let response = await axios.get(URL);
    // response = response.data;
    // setData(response);
  },[]);


  return (
    <div className='white'>
      <ReactFlexyTable title='Task Management' data={data} columns={columns}/>
        <Route
          path={`${props.match.url}/score_file`}
          render={() => {
            return (
              <PopupScore
                onClick={() => {
                  props.history.push(props.match.url);
                }}
                File_index={file_index}
              />
            );
          }}
        />
    </div>
  );
};

export default Managetask;