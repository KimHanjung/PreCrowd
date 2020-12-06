import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import "../main.css";
import "bootstrap/dist/css/bootstrap.min.css";

import ReactFlexyTable from 'react-flexy-table'
import 'react-flexy-table/dist/index.css'

function Tasklist({ history }) {
    const user_id = localStorage.getItem("user");
    const [tasks, setTasks] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchTasks = async () => {
        try {
            setError(null);
            setTasks(null);
            setLoading(true);
            const response = await axios.get(
                'http://165.132.105.42:3020/src/api/tasklist' ,{
                    params:{
                        id: user_id
                    }
                }
            );
            setTasks(response.data);
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    };

    const MyMove=({task})=>{
        return(

            <Link to={{
                pathname: '/participation',
                state: {
                    taskname: task
                    }
                }}>
                <button className='btn btn-primary'>Participate</button>
            </Link>
        )
    }

    const additionalCols=[
        {
        header:'Move',
        td:(tasks)=>{
            return(
                <div>
                    <MyMove task = {tasks.Task_name}></MyMove>
                </div>
                
                
            )
        }
        

    }        
    ]
    
    useEffect(() => {
        fetchTasks();
    }, []);

    if (loading) return <div>Loading</div>;
    if (error) return <div>Error</div>;
    if (!tasks) return null;


    return (
        <>
            <body>
                
                
                <ReactFlexyTable data={tasks} className = 'body_color' additionalCols={additionalCols}/>


            </body>


            <div className="reload_button"
            style={{
                top:'200px',
                padding: '10px'
            }}
            >
            <button class="btn btn-primary"
            
            onClick={fetchTasks}>Reload</button>
            </div>
        </>
    );
}

export default withRouter(Tasklist);