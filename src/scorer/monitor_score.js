import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const divStyle = {
  color: 'white',
  margin: 100,
  font: 'Helvetica',
}

class Scorer extends Component {
  state = {
    ID : '',
    data : [],
  }

  getData = async () => {
    const myjson = JSON.parse(localStorage.getItem("user"));
    this.setState({ID: myjson.id});
    let response = await axios.get('http://localhost:3001/src/api/todolist',{
      params: {
        id: this.state.ID
      }
    });
    response = response.data;
    this.setState({data: response});
  };

  componentDidMount(){
    this.getData();
  }

  render() {
    return (
      <div style={divStyle}>
        {
          this.state.data.map((item) => {
            return(
              <div>
              <p key = {item.key}>name: {item.Parsing_file_name}, file index: {item.File_index}</p>
              </div>
            );
          })
        }
      </div>
        
    );
  }
}


export default Scorer;
