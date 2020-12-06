import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, Route, useHistory} from 'react-router-dom';
import ReactFlexyTable from 'react-flexy-table'
import 'react-flexy-table/dist/index.css'
import Popup from "./monitoring_popup.js";



function Submit_monitoring(props) {
    const [users, setUsers] = useState([]);
    const [taskname, setTaskname] =useState('');
    const Myuser = JSON.parse(localStorage.getItem("user"));
    const user_id = Myuser.id;
    const history = useHistory();

    const fetchUsers = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3001/src/api/submit/taskstate',{
                    params:{
                        user_id: user_id
                    }
                }
            );
            if(response.data[0].Task_name === null){
                setUsers([{"Task_name":"nothing submitted","pass_num":0,"tuple_num":0}]);
            }
            else{
                setUsers(response.data); 
            }
            
        } catch (e) {
            console.log(e);
        }
    };

    const MyMove=(task)=>{
        setTaskname(task);
    }

    const additionalCols=[
        {
        header:'Action',
        td:(users)=>{
            if(users.Task_name !== "nothing submitted"){

                return(
                    <Link to={`/Submit_monitoring/monitoring_popup`}>
                        <button className='btn btn-primary' onClick={() => {MyMove(users.Task_name)}}>Monitoring</button>
                    </Link>
                )
            }
            
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
                path={`/Submit_monitoring/monitoring_popup`}
                render={() => {
                    return (
                    <Popup
                        onClick={(e) => {
                        history.push('/Submit_monitoring');
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