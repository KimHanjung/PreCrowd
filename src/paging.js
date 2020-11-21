import React, { Component } from 'react';
import Admin from './admin.js'
import Evaluate from './evaluate.js'
import Submit from './submit.js'
import { Route } from 'react-router-dom';


class Paging extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Route path="/admin" component={Admin} />
                <Route path="/evaluate" component={Evaluate} />
                <Route path="/submit" component={Submit} />
            </div>
        );
    }
}

export default Paging;