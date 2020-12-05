import React, { Component } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import './main.css';


class Home extends Component {
  constructor(props){
    super(props);
        this.state = {
            login: true,
            role: undefined,
        }
  }
  componentDidMount(){
      const member = (JSON.parse(localStorage.getItem("user")));
      if(member !== null) {
        if(member.role === 'Administrator') this.props.history.push('/admin');
        else if(member.role === 'Submittor') this.props.history.push('/submittor');
        else if(member.role === 'Evaluationer') this.props.history.push('/evaluationer');
      }
  }
  render() {
    return (
        <div className='home'>
            <div className='wise'>
                <pre className='pre'>지식은 모일수록 가치있다.
                    <br/>-???-
                </pre>
            </div>
        </div>
        );
    }
}

    export default Home;
