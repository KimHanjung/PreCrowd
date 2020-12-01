import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../main.css';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {ID:'default'};
}

  render() {
    return (<div className='home'>
            {console.log("2000">"1999")}
        </div>
    );
  }
}
export default Admin;
