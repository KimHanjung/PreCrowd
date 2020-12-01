const db = require("../models");
const config = require("../config/auth.config");
const Task = db.task;
const Original = db.origin;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");

exports.create_task = (req, res) => {
  if ((req.body.tableschema.match(/,/g) || []).length != (req.body.originalschema.match(/,/g) || []).length) {
    res.status(507).send({ message: 'Original data type schema must match the task data type schema.' });
    console.log('failed: Original data type schema must match the task data type schema.');
  }
  else{
  Task.create({
    Task_name: req.body.taskname,
    Desc: req.body.desc,
    Term: req.body.term,
    Task_data_table_name: req.body.tablename,
    Task_data_table_schema: req.body.tableschema
  })
    .then(user => {
      res.send({ message: "New task is successfully created!" });
      console.log('create_task success');
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
      console.log('create_task failed');
    });
  }
  };

exports.create_original = (req, res) => {

  Original.create({
    //Type_id: 7,
    Schema: req.body.originalschema,
    Type_name: req.body.originalname,
    Task_name: req.body.taskname
  })
    .then(user => {
      res.send({ message: "New original data type is successfully created!" });
      console.log('create_original success');
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
      console.log('create_original failed');
    });
  };

        //create new task at Database
    //alert('1');
    // if ((req.body.tableschema.match(/,/g) || []).length != (req.body.originalschema.match(/,/g) || []).length) {
    //   res.status(400).send({ message: 'Original data type must match the task data type.' });
    //   console.log('failed: Original data type must match the task data type.');
    //   return
    // }