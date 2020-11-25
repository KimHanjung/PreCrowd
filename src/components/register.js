import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
//import { isEmail } from "validator";

import AuthService from "../services/auth.service";
import { useHistory } from "react-router-dom";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validId = (value) => {
  if (value.length < 5 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        Plean enter your Id between 5 and 20.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const Register = (props) => {
  const history = useHistory();
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeId = (e) => {
    const id = e.target.value;
    setId(id);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeRole = (e) => {
    const role = e.target.value;
    setRole(role);
    console.log(e.target.value);
  }

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();
    console.log('hi');
    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(username, id, password, role).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
          props.history.push('/');
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, vusername]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="Id">Id</label>
                <Input
                  type="text"
                  className="form-control"
                  name="Id"
                  value={id}
                  onChange={onChangeId}
                  validations={[required, validId]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="role">Role<br/></label>
                  <label>
                    Submittor
                    <Input type="radio" name="role" value="Submittor" onChange={onChangeRole}/>
                  </label>
                  <label>
                    Evaluationer
                    <Input type="radio" name="role" value="Evaluationer" onChange={onChangeRole}/>
                  </label>
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Sign Up</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={ successful ? "alert alert-success" : "alert alert-danger" }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Register;