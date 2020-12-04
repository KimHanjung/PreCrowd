//2
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import "../main.css";
import "bootstrap/dist/css/bootstrap.min.css";

import ReactFlexyTable from 'react-flexy-table'
import 'react-flexy-table/dist/index.css'

function Tasklist({ history }) {
    const user_id = localStorage.getItem("user");
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        try {
            setError(null);
            setUsers(null);
            setLoading(true);
            const response = await axios.get(
                '../src/api/tasklist' ,{
                    params:{
                        id: user_id
                    }
                }
            );
            setUsers(response.data);
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    };

    const MyMove=({task})=>{
        return(

            <Link to={{
                pathname: '/submitter/participation',
                state: {
                    taskname: task
                    }
                }}>
                move to {task}
            </Link>
        )
    }

    const additionalCols=[
        {
        header:'Move',
        td:(users)=>{
            return(
                <div>
                    <MyMove task = {users.Task_name}></MyMove>
                </div>
                
                
            )
        }
        

    }        
    ]
    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) return <div>Loading</div>;
    if (error) return <div>Error</div>;
    if (!users) return null;


    return (
        <>
            <body>
                
                
                <ReactFlexyTable data={users} className = 'body_color' additionalCols={additionalCols}/>


            </body>


            <div className="reload_button"
            style={{
                top:'200px',
                padding: '10px'
            }}
            >
            <button class="btn btn-primary"
            
            onClick={fetchUsers}>Reload</button>
            </div>
        </>
    );
}

export default withRouter(Tasklist);