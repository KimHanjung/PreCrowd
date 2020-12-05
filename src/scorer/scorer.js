import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Scorer extends Component {
  constructor(props) {
    super(props);
    this.state = {ID:'default'};
}

  render() {
    return (
        <div className='home'>
            <div className='wise'>
                <pre className='pre'>지식은 모일수록 가치있다.
                    <br/>-???-
                </pre>
            </div>
            <div className='mainSelect'>
                <Link to="/evaluate_file">
                    <button className='mainbutton'>파일 평가하기</button>
                </Link>
                <Link to="/monitor_evaluation">
                    <button className='mainbutton'>평가 내역 모니터링</button>
                </Link>
            </div>
        </div>
    );
  }
}
export default Scorer;
