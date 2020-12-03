//5

import React, { useState, Component } from 'react'
import axios from 'axios';
import Select from 'react-select';
function Submit({ history, props}){

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [typename, setTypename] =useState(null);
    const [typelist, setTypelist] = useState(null);
    const [round, setRound] = useState(null);
    const [period, setPeriod] = useState(null);
    const [userfile, setUserfile] =useState(null);
    const Myuser = JSON.parse(localStorage.getItem("user"));
    const user_id = Myuser.id;
    const Task_name = props.location.state.taskname;
    const fetchType = async () => {
        try {
            setLoading(true);
            const type = await axios.get(
                '../src/api/typelist',{
                    params:{
                        task_name: Task_name
                    }
                }
            );
            setTypelist(type.data); 
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    };



    const handlePost=()=> {
        const formData = new FormData();

        return axios.post("/src/api/submit", {
            user_id,
            typename,
            Task_name,
            round,
            period,
            userfile
        }).then(res => {
            alert('success')
        }).catch(err => {
            alert('fail')
        })
    }

    
    return (
            <div>
                <h1>{this.state.Task_name}, hello</h1>
                <Select options={typelist} onChange={(e)=>setTypename(e.target.value)}/>
                <input type="file" name="file" onChange={(e) => setUserfile(e.target.files[0])} />
                <input type="text" name="Round" onChange={(e) => setRound(e.target.value)} />
                <input type="text" name="Duration" onChange={(e) => setPeriod(e.target.value)}/>
                <button type="button" onClick={() => handlePost()} > Submit? </button>
            </div>
        )
    
}

export default Submit;