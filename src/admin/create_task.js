import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import UserService from "../services/user.service";
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

const vTaskname = (value) => {
  if (value.length < 1 || value.length > 30) {
    return (
      <div className="alert alert-danger" role="alert">
        Task name must be less than 30 characters.
      </div>
    );
  }
};

const vTerm = (value) => {
  if (parseInt(value) < 1 || parseInt(value) > 30) {
    return (
      <div className="alert alert-danger" role="alert">
        Minimum term must be 1 ~ 30 days.
      </div>
    );
  }
};

const vDesc = (value) => {
  if (value.length > 100) {
    return (
      <div className="alert alert-danger" role="alert">
        Description must be less than 100 characters.
      </div>
    );
  }
};

const vTablename = (value) => {
  if (value.length < 1 || value.length > 30) {
    return (
      <div className="alert alert-danger" role="alert">
        Table name must be less than 30 characters.
      </div>
    );
  }
};

const vTableschema = (value) => {
  if (value.length < 1 || value.length > 100) {
    return (
      <div className="alert alert-danger" role="alert">
        Table schema must be less than 100 characters.
      </div>
    );
  }
};

const vOriginalname = (value) => {
  if (value.length < 1 || value.length > 30) {
    return (
      <div className="alert alert-danger" role="alert">
        Original data type name must be less than 30 characters.
      </div>
    );
  }
};

const vOriginalschema = (value) => {
  if (value.length < 1 || value.length > 100) {
    return (
      <div className="alert alert-danger" role="alert">
        Table schema must be less than 100 characters.
      </div>
    );
  }
};

const CreateTask = (props) => {
  const history = useHistory();
  const form = useRef();
  const checkBtn = useRef();

  const [taskname, setTaskname] = useState("");
  const [term, setTerm] = useState("");
  const [desc, setDesc] = useState("");
  const [tablename, setTablename] = useState("");
  const [tableschema, setTableschema] = useState("");
  const [originalname, setOriginalname] = useState("");
  const [originalschema, setOriginalschema] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeTaskname = (e) => {
    const taskname = e.target.value;
    setTaskname(taskname);
  };

  const onChangeTerm = (e) => {
    const term = e.target.value;
    setTerm(term);
  };

  const onChangeDesc = (e) => {
    const desc = e.target.value;
    setDesc(desc);
  };

  const onChangeTablename = (e) => {
    const tablename = e.target.value;
    setTablename(tablename);
  };

  const onChangeTableschema = (e) => {
    const tableschema = e.target.value;
    setTableschema(tableschema);
  }

  const onChangeOriginalname = (e) => {
    const originalname = e.target.value;
    setOriginalname(originalname);
  }

  const onChangeOriginalschema = (e) => {
    const originalschema = e.target.value;
    setOriginalschema(originalschema);
  }

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      UserService.create_task(taskname, term, desc, tablename, tableschema, originalschema)
      .then(
        (response) => {
          console.log(response.data.message);
          setMessage(response.data.message);
          //alert('success 1!');
          
          UserService.create_original(originalname, originalschema, taskname).then(
            (response) => {
              //alert('success 2!');
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
              //alert('2:',resMessage);
              setMessage(resMessage);
              setSuccessful(false);
            }
          );
        })
        .catch(
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
            //alert('1:',resMessage);
          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };


  return (
    <div className="registercolumn">
      <div className="registercard">
        <div className='menutitle'> 태스크 생성 </div>
        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="Task name">Task name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="Task name"
                  value={taskname}
                  onChange={onChangeTaskname}
                  validations={[required, vTaskname]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="Minimum update term">Minimum update term</label>
                <Input
                  type="text"
                  className="form-control"
                  name="Minimum update term"
                  value={term}
                  onChange={onChangeTerm}
                  validations={[required, vTerm]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="Description of task">Description of task</label>
                <Input
                  type="text"
                  className="form-control"
                  name="Description of task"
                  value={desc}
                  onChange={onChangeDesc}
                  validations={[required, vDesc]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="Table name">Task data table name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="Table name"
                  value={tablename}
                  onChange={onChangeTablename}
                  validations={[required, vTablename]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="Table schema">Task data table schema</label>
                <Input
                  type="text"
                  className="form-control"
                  name="Table schema"
                  value={tableschema}
                  onChange={onChangeTableschema}
                  validations={[required, vTableschema]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="Original name">Original data type name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="Original name"
                  value={originalname}
                  onChange={onChangeOriginalname}
                  validations={[required, vOriginalname]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="Original schema">Original data type schema</label>
                <Input
                  type="text"
                  className="form-control"
                  name="Original schema"
                  value={originalschema}
                  onChange={onChangeOriginalschema}
                  validations={[required, vOriginalschema]}
                />
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

export default CreateTask;