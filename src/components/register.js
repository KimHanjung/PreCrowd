import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Select from "react-validation/build/select";
import "bootstrap/dist/css/bootstrap.min.css";
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
        Please enter your Id between 5 and 20.
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

const vbdate = (value) => {
  if (value.length !== 8) {
    return (
      <div className="alert alert-danger" role="alert">
        YYYYMMDD
      </div>
    );
  }
  else {
    const month = parseInt(value.slice(4, 6));
    const date = parseInt(value.slice(6, 8));
    if ((month < 1 || month > 12) || (date < 1 || date > 31)) {
      return (
        <div className="alert alert-danger" role="alert">
          YYYYMMDD
        </div>
      );
    }
  }
};

const vphone = (value) => {
  if (value.match( /^[0-9]{3}[-]+[0-9]{4}[-]+[0-9]{4}$/ ) === null) {
    return (
      <div className="alert alert-danger" role="alert">
        xxx-xxxx-xxxx
      </div>
    );
  }
}

const Register = (props) => {
  const history = useHistory();
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [bdate, setBdate] = useState("");
  const [phone, setPhone] = useState("");
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

  const onChangeAddress = (e) => {
    const address = e.target.value;
    setAddress(address);
  };

  const onChangeGender = (e) => {
    const gender = e.target.value;
    setGender(gender);
  }

  const onChangeBdate = (e) => {
    const bdate = e.target.value;
    setBdate(bdate);
  }

  const onChangePhone = (e) => {
    const phone = e.target.value;
    setPhone(phone);
  }

  const onChangeRole = (e) => {
    const role = e.target.value;
    setRole(role);
  }

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(username, id, password, address, gender, bdate, phone, role).then(
        (response) => {
          console.log(response.data.message);
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
    <div className="registercolumn">
      <div className="registercard">
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
                <label htmlFor="address">Address</label>
                <Input
                  type="text"
                  className="form-control"
                  name="address"
                  value={address}
                  onChange={onChangeAddress}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="gender">Gender<br/></label>
                <Select name='gender' value={gender} validations={[required]} onChange={onChangeGender}>
                  <option value=''>Gender</option>
                  <option value='M'>Male</option>
                  <option value='F'>Female</option>
                </Select>
              </div>

              <div className="form-group">
                <label htmlFor="bdate">Birthday</label>
                <Input
                  type="text"
                  className="form-control"
                  name="bdate"
                  placeholder = "YYYYMMDD"
                  value={bdate}
                  onChange={onChangeBdate}
                  validations={[required, vbdate]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <Input
                  type="text"
                  className="form-control"
                  name="phone"
                  placeholder = "xxx-xxxx-xxxx"
                  value={phone}
                  onChange={onChangePhone}
                  validations={[required, vphone]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="role">Role<br/></label>
                <Select name='role' value={role} validations={[required]} onChange={onChangeRole}>
                  <option value=''>Choose your role</option>
                  <option value='Submittor'>Submittor</option>
                  <option value='Evaluationer'>Evaluationer</option>
                </Select>
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