const db = require("../models");
const config = require("../config/auth.config");
const Task = db.task;
const Original = db.origin;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
const { task } = require("../models");

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

  exports.get_task = (req, res) =>{
    Task.findAll({
      raw:true
    })
      .then(task =>{
        res.send({users: task});
        console.log('get_task success');
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
        console.log('get_task failed');
      });
  };

  exports.delete_task = (req, res) =>{
    Task.destroy({
      where:
      {
        Task_name: req.body.Task_name
      }
    })
      .then(user =>{
        res.send({ message: "delete_task is completed!"});
        console.log('delete_task is completed!');
      })
      .catch(err => {
        res.status(500).send({ message: "failed: delete_task" });
        console.log('failed: delete_task');
      });
  };