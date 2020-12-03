//4
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, withRouter } from 'react-router-dom';


function Submit_apply({ history }) {
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const Myuser = JSON.parse(localStorage.getItem("user"));
    const user_id = Myuser.id;
    const fetchUsers = async () => {
        try {
            setError(null);
            setUsers(null);
            setLoading(true);
            const response = await axios.get(
                '../src/api/taskin',{
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


    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) return <div>Loading..</div>;
    if (error) return <div>Error</div>;
    if (!users) return null;
    return (
        <>
            <ul>
                {users.map(user => (
                    <main>
                    
                    <Link to={{
                     pathname: '/submitter/submit_page',
                     state: {
                     taskname:user.Task_name
                    }
                        }}>
                            <button>{user.Task_name}</button>
                    </Link>
    
                    </main>
                ))}
            </ul>
            <button onClick={fetchUsers}>Reload</button>
        </>
    );
}

export default withRouter(Submit_apply);







