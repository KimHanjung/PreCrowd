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
    ID : 'default',
    data : [],
  }

  getData = async () => {
    let response = await axios.get('https://jsonplaceholder.typicode.com/users');
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
              <p key = {item.name}>name: {item.name} </p>
              <p key = {item.username}>username: {item.username} </p>
              </div>
            );
          })
        }
      </div>
        
    );
  }
}


export default Scorer;
