const db = require("../models");
const Task = db.task;
const Original = db.origin;
const Member = db.member;
const Approval = db.approval;

const { QueryTypes } = require('sequelize');
const Op = db.Sequelize.Op;

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

  exports.get_approval = (req, res) => {
    db.sequelize.query('select Members.Id as Id, Members.Name as Name, Members.Score as Score, Approvals.Status as Status\
    from Tasks, Approvals, Members\
    where Tasks.Task_name=? and Tasks.Task_name=Approvals.Task_name and Approvals.H_id=Members.Id', {
      raw:true,
      type: QueryTypes.SELECT,
      replacements: [req.body.Task_name],
    })
    .then((result) => {
      res.send({result: result});
      console.log('get_approval is completed!');
    })
    .catch(err => {
      res.status(500).send({ message: "failed: get_approval" });
      console.log("failed: get_approval", err);
    });
  };

  exports.modify_approval = (req, res) => {
    let id = req.body.id;
    let taskname = req.body.taskname;
    let input_status = 1-req.body.status;
    db.sequelize.query('update Approvals\
    set Status=?\
    where Task_name=? and H_id=?', {
      raw:true,
      type: QueryTypes.UPDATE,
      replacements: [input_status, taskname, id],
    })
      .then((message) => {
            res.send(message)
            console.log('success: modify_approval');
          })
      .catch(err => {
        res.status(500).send({ message: err.message });
        console.log(err);
      });
  };

  exports.set_pass = (req, res) => {
    db.sequelize.query('update Tasks\
    set Pass=?\
    where Task_name=?', {
      raw:true,
      type: QueryTypes.UPDATE,
      replacements: [req.body.pass, req.body.taskname],
    })
      .then((message) => {
            res.send(message)
            console.log('success: set_pass');
          })
      .catch(err => {
        res.status(500).send({ message: err.message });
        console.log(err);
      });
  };