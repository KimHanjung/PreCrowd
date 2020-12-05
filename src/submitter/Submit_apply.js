//4
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, Route, withRouter } from 'react-router-dom';
import ReactFlexyTable from 'react-flexy-table'
import 'react-flexy-table/dist/index.css'
import SubmitPage from './Submit_page';

function Submit_apply({ history, props }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [taskname, setTaskname] =useState('');
    const Myuser = JSON.parse(localStorage.getItem("user"));
    const user_id = Myuser.id;
    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                'http://localhost:3001/src/api/taskin',{
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
                pathname: '/submit_page',
                state: {
                    taskname: task
                    }
                }}>
                <button className='btn btn-primary'>Submit</button>
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

    if (loading) return <div>Loading..</div>;
    if (error) return <div>Error</div>;
    if (!users) return null;
    return (
        <>
            <ReactFlexyTable data={users} className = 'body_color' additionalCols={additionalCols}/>
        </>
    );
}

export default withRouter(Submit_apply);