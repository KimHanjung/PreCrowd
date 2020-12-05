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
                'http://localhost:3001/src/api/tasklist' ,{
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
        header:'Action',
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
        <div className='white'>
            <ReactFlexyTable data={users} className = 'body_color' additionalCols={additionalCols}/>
            {/* <div className="right">
                <button class="btn btn-primary" onClick={fetchUsers}>Reload</button>
            </div> */}
        </div>
    );
}

export default withRouter(Tasklist);