import React, { Component } from "react";
import { createPortal } from "react-dom";

import AuthService from "../services/auth.service";
import {useHistory} from "react-router-dom";

const modalStyle = {
  position: "fixed",
  left: 0,
  top: 0,
  bottom: 0,
  right: 0,
  backgroundColor: "rgba(0,0,0,.2)",
  color: "##FFF",
  fontSize: "40px",
};
const Modal = (props) => { 
    
const history = useHistory();

  const withdrawal = () => {
    AuthService.withdrawal()
    .then(() => history.push('/'));
  }
    return createPortal(
      <div style={modalStyle} onClick={props.onClick}>
        <div
            style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: '100%',
            }}
        >   
            <h1>Are you sure?</h1>
            <button className='btn btn-secondary' onClick={withdrawal}>withdrawal</button>
            <button className='btn btn-secondary' onClick={props.onClick}>Cancel</button>
        </div>
      </div>,
      document.getElementById("modal_root"),
    );
}
export default Modal;