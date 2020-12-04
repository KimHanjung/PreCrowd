import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, withRouter } from 'react-router-dom';
import { response } from 'express';

function Submit_monitoring({history, props}){

    const [tasknum, setTasknum] = useState(null);
    const [typenum, setTypenum] = useState([]);
    const [scores, setScores] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const Myuser = JSON.parse(localStorage.getItem("user"));
    const user_id = Myuser.id;
    const fetchScore = async () => {
        try {
            setLoading(true);
            const score = await axios.get(
                '../src/api/submit/score',{
                    params:{
                        id: user_id
                    }
                }
            );
            setScores(score.data); 
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    };

    const fetchTask = async () => {

        try{
            const response = await axios.get(
                '../src/api/taskin',{
                    params:{
                        id: user_id
                    }
                }
            );
            setTasks(response.data)
            }
             catch(e){
                setError(e);
            }
            for(var i=0; i<response.length; i++){
                try {
                    setLoading(true);
                    const task = await axios.get(
                        '../src/api/submit/taskstate',{
                            params:{
                              user_id: user_id,
                              task_name: tasks[i]
                            }
                         }
                     );
                    setTasks(prev=>{
                        return[...prev,task.data];
                    }); 
                } catch (e) {
                    setError(e);
             }
                setLoading(false);
            }   
      };

      const fetchMonitor = async() =>{
        for(var i=0; i<tasknum.length; i++){
            try{
                const response = await axios.get(
                    '../src/api/typelist',{
                        params:{
                            task_name: tasknum[i]
                        }
                    }
                );
    
            }catch(e){
                setError(e);
            }
        }
        

      };


    useEffect(() => {
        fetchScore();
        fetchTask();
    }, []);

    if (loading) return <div>Loading..</div>;
    if (error) return <div>Error</div>;

}
export default Submit_monitoring;