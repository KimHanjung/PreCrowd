import React, { Component } from 'react';
import { Link, Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import './main.css';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:4002');
class Admin extends Component {
  constructor(props) {
    super(props);
    this.updateConnected = this.updateConnected.bind(this)
    this.updateChannel = this.updateChannel.bind(this);
    this.keyUpdateChannel = this.keyUpdateChannel.bind(this);
}
  updateConnected(){
    if(this.props.connected==='False') this.props.onUpdate_connect2('True');
  }
  updateChannel(event){
    if(event.target.value!==this.props.channel) this.props.onUpdate_channel2(event.target.value);
  }
  keyUpdateChannel(event){
    if(event.keyCode===13) {
        if(event.target.value!==this.props.channel) this.props.onUpdate_channel2(event.target.value);
    }
  }
  render() {
    return (
        <body>
        <header className='el-header'>
        <div className='headercontents'>
        <Link to="/">
            <button className='title'>PRECROWD</button>
        </Link>
        </div>
        </header>
        </body>
    );
  }
}
export default Admin;
