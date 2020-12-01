const db = require("../models");
const config = require("../config/auth.config");
const Member = db.member;
const Task = db.Task;
const Approval = db.Approval;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { response } = require("express");

exports.signup = (req, res) => {
  // Save User to Database
  const gender = (req.body.gender === 'M') ? 1 : 0;
  Member.create({
    Name: req.body.username,
    Id: req.body.id,
    Pw: bcrypt.hashSync(req.body.password, 8),
    Bdate: req.body.bdate,
    Address: req.body.address,
    Gender: gender,
    Phone: req.body.phone,
    Role: req.body.role
  })
    .then(user => {
      res.send({ message: "User was registered successfully!" });
      console.log('registed');
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
      console.log('failed');
    });
};
exports.taketask = (req, res) =>{
  Task.findAll({
    raw:true
  })
    .then(task =>{
      var list = [];
      var i = 0;
      while(i< task.length){
        list.push(task[i].Task_name);
        i = i + 1;
      }
      res.send({
        task_list : list
      });
    });
};
exports.management = (req, res) =>{
  Member.findAll({
    raw:true
  })
    .then(member =>{
      if(req.body.task === ""){
        var list = [];
        var i = 0;
        while(i < member.length){
          var bool = true;
          if(member[i].Id === 'admin'){
            bool = false;
          }
          if(req.body.id != ''){
            if(member[i].Id.indexOf(req.body.id) === -1){
              bool = false;
            }
          }
          if(req.body.gender === "1"  || req.body.gender === "0"){
            if(member[i].Gender !=  parseInt(req.body.gender)){
              bool = false;
            }
          }
          var by1 = parseInt(req.body.byear1)
          var by2 = parseInt(req.body.byear2)
          if(by1 === ""){
            by1 = parseInt("0000");
          }
          if(by2 === ""){
            by2 = parseInt("9999");
          }
          if(parseInt(member[i].Bdate) < by1 || parseInt(member[i].Bdate)  > by2){
            console.log(by2);
            bool = false;
          }
          if(member[i].Role.indexOf(req.body.role) === -1){
            bool = false;
          }
          if(bool){
            list.push(member[i]);
          }
          i = i + 1;
        }
      }
      else{
        Approval.findAll({
          raw: true,
          where:
          {
            Task_name: req.body.task
          
          }
        })
        .then(task =>{
          var list = [];
        var i = 0;
        while(i < member.length){
          var v = 0;
          var bool = true;
          var bool2 = false;
          if(member[i].Id === 'admin'){
            bool = false;
          }
          if(req.body.id != ''){
            if(member[i].Id.indexOf(req.body.id) === -1){
              bool = false;
            }
          }
          while(t<task.length){
            if(member[i].Id === task[t].H_id){
              bool2 = true;
            }
            t = t + 1;
          }
          if(req.body.gender === "1"  || req.body.gender === "0"){
            if(member[i].Gender !=  parseInt(req.body.gender)){
              bool = false;
            }
          }
          var by1 = parseInt(req.body.byear1)
          var by2 = parseInt(req.body.byear2)
          if(by1 === ""){
            by1 = parseInt("0000");
          }
          if(by2 === ""){
            by2 = parseInt("9999");
          }
          if(parseInt(member[i].Bdate) < by1 || parseInt(member[i].Bdate)  > by2){
            console.log(by2);
            bool = false;
          }
          if(member[i].Role.indexOf(req.body.role) === -1){
            bool = false;
          }
          if(bool && bool2){
            list.push(member[i]);
          }
          i = i + 1;
        }
        
        })
      }
        res.send({
          users: list
        });
      
    });
};
exports.withdrawal = (req, res) =>{
  Member.destroy({
    where:
    {
      Id: req.body.id
    }
  })
    .then(user =>{
      res.send({ message: "Member withdrawl is completed!"});
      console.log('sign out');
    })
    .catch(err => {
      res.status(500).send({ message: "Wrong Id" });
      console.log('wrong id');
    });
};

exports.signin = (req, res) => {
  Member.findOne({
    where: {
      Id: req.body.id
    }
  })
    .then(member => {
      if (!member) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        member.Pw
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: member.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      res.status(200).send({
        id: member.Id,
        name: member.Name,
        role: member.Role,
        address: member.Address,
        gender: member.Gender,
        phone: member.Phone,
        bdate: member.Bdate,
        accessToken: token
      });
    })
};

exports.update = (req, res) => {
  // Save User to Database
  Member.update({
    Address: req.body.address,
    Phone: req.body.phone,
  },
  {
    where: {Id: req.body.id},
    returning: true,
    plain: true
})
    .then((member) => {
          Member.findOne({
            where: {
              Id: req.body.id
            }
          })
          .then((member) => {
              
            var token = req.body.headers["x-access-token"];

            res.status(200).send({
              id: member.Id,
              name: member.Name,
              role: member.Role,
              address: member.Address,
              gender: member.Gender,
              phone: member.Phone,
              bdate: member.Bdate,
              accessToken: token
            });

            })
          console.log('updated');
        })
    .catch(err => {
      res.status(500).send({ message: err.message });
      console.log('update failed');
    });
};

exports.password = (req, res) => {
  // Save User to Database
  Member.update({
    Pw: bcrypt.hashSync(req.body.password, 8),
  },
  {where: {Id: req.body.id}})
    .then(user => {
      res.send({ message: "User's password was updated successfully!" });
      console.log('password');
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
      console.log('failed');
    });
};