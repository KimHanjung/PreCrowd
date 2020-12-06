import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { createPortal } from "react-dom";
import ReactFlexyTable from 'react-flexy-table';
import 'react-flexy-table/dist/index.css';

const Popup = (props) => {

const [data, setData] = useState([
  {
    Id: 'dafault',
    Type_name: 'dafault',
    Parsing_file_name: 0,
    Round: 0,
    Period: 0,
  }
]);

const columns=[
  {
    header: 'Id',
    key: 'Id',
    td: (data) => <div>{data.Id}</div>,
  },
  {
    header: 'Type_name',
    key: 'Type_name',
    td: (data) => <div>{data.Type_name}</div>,
  },
  {
    header: 'Parsing_file_name',
    key: 'Parsing_file_name',
    td: (data) => <div>{data.Parsing_file_name}</div>,
  },
  {
    header: 'Round',
    key: 'Round',
    td: (data) => <div>{data.Round}</div>,
  },
  {
    header: 'Period',
    key: 'Period',
    td: (data) => <div>{data.Period}</div>,
  },
]

const fetchdata = async () => {
    try {
        const response = await axios.get(
            'http://165.132.105.42:3020/src/api/typestate',{
                params:{
                    user_id: props.id,
                    task_name: props.taskname
                }
            }
        );
        console.log(response);
        setData(response.data); 
    } catch (e) {
        console.log(e);
    }
};

useEffect(() => {
    fetchdata();
  },[]);

  return createPortal(
    <div className='modalSheet1'>
      <div className='modalContent'>   
        <ReactFlexyTable className='rft' data={data} columns={columns} globalSearch />
        <div className='right'>
        <button className='btn btn-secondary' onClick={props.onClick}>Back</button>
        </div>
      </div>
    </div>,
    document.getElementById("modal_root"),
  );
};



export default Popup;