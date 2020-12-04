import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, Route} from 'react-router-dom';
import ReactFlexyTable from 'react-flexy-table'
import 'react-flexy-table/dist/index.css'
import Popup from "./monitoring_popup.js";



function Submit_monitoring({ history, props }) {
    const [users, setUsers] = useState([]);
    const [taskname, setTaskname] =useState('');
    const Myuser = JSON.parse(localStorage.getItem("user"));
    const user_id = Myuser.id;

    const fetchUsers = async () => {
        try {
            const response = await axios.get(
                '../src/api/taskin',{
                    params:{
                        id: user_id
                    }
                }
            );
            setUsers(response.data); 
        } catch (e) {
            console.log(e);
        }
    };

    const MyMove=(task)=>{
        setTaskname(task);
    }

    const additionalCols=[
        {
        header:'Move',
        td:(users)=>{
            return(
                <Link to={`/submitter/Submit_monitoring/monitoring_popup`}>
                    <button className='btn btn-primary' onClick={() => {MyMove(users.Task_name)}}>Monitoring</button>
                </Link>
            )
        }
    }        
    ]

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className='white'>
            <ReactFlexyTable data={users} className = 'body_color' additionalCols={additionalCols}/>
            <Route
                path={`/submitter/Submit_monitoring/monitoring_popup`}
                render={() => {
                    return (
                    <Popup
                        onClick={(e) => {
                        props.history.push(props.match.url);
                        }}
                        taskname={taskname}
                        id={user_id}
              />
            );
          }}
        />
    </div>
    );
}

export default Submit_monitoring;







