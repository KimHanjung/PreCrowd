import React, { Component } from 'react';
import { getDownloadFile } from './file';
import { saveAs } from 'file-saver'


class Scorer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ID:'',
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
    console.log(this.state.checked);
};

  handleSubmit = () =>{ //submit 하면 서버로 점수와 패스 여부 보내줌

  }

  render() {
    return (
      <div style = {
        {marginLeft: 100}
      }>
        <div>
        <button className = 'scorebutton' type = 'button' onClick = {this.downloadFile}>Download</button>
        </div>
        <div>
        <input style = {{width: 300}} type = 'text' onChange = {this.changeHandler} placeholder = "score"></input><br></br>
        </div>
        <div style = {{color: 'white'}}>Pass?
        <input style = {{width: 30}} type = 'checkbox' checked = {this.state.checked} onChange = {this.handleCheckbox} placeholder = "pass/nonpass"></input>
        </div>
        <button type = 'button' onClick = {this.handleSubmit}>Submit</button>
      </div>
    );
  }
}
export default Scorer;
