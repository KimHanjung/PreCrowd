import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class App extends Component {
  
    componentWillMount() {
      this.unlisten = this.props.history.listen((location, action) => {
        console.log('@@@@@@@@@2');
        this.props.change();
        console.log('==========');
      });
    }
    componentWillUnmount() {
        this.unlisten();
    }
    render() {
       return (
           <div>{this.props.children}</div>
        );
    }
  }
  export default withRouter(App);