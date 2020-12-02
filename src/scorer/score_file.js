import React, { Component } from 'react';
import { getDownloadFile } from './file';
import { saveAs } from 'file-saver'

class Scorer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ID:'default',
      score: 0,
      pass: 0,
      checked: false,
    };
}
  downloadFile = () =>{
    getDownloadFile()
      .then(blob => saveAs(blob, 'file.csv'))
  }

  changeHandler = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });
  }

  handleCheckbox = (e) => {
    const { target: { checked } } = e;
    this.setState({ checked });
    if(this.state.checked === true){
      this.setState({pass: 0});
    }
    else{
      this.setState({pass: 1});
    }
    console.log(this.state.pass);
};

  handleSubmit = () =>{ //submit 하면 서버로 점수와 패스 여부 보내줌

  }

  render() {
    return (
      <div>
      <button type = 'button' onClick = {this.downloadFile}>Download</button><br></br>
      <input type = 'text' onChange = {this.changeHandler} placeholder = "score"></input><br></br>
      <div>Pass?</div>
      <input type = 'checkbox' checked = {this.state.checked} onChange = {this.handleCheckbox} placeholder = "pass/nonpass"></input><br></br>
      <button type = 'button' onClick = {this.handleSubmit}>Submit</button>
      </div>
    );
  }
}
export default Scorer;
