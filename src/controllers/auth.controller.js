const db = require("../models");
const config = require("../config/auth.config");
const Member = db.member;

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
exports.management = (req, res) =>{
  const gender_to = -1;
  
  if (req.body.gender === 'M'){
    gender_to = 1;
  }
  else if (req.body.gender === 'F'){
    gender_to = 0;
  }
  Member.findAll({
    raw:true
    /*where:
    {
      [Op.and]:
      {
        Id: {
          [Op.contains]: req.body.id
        },
        Gender: {
          [Op.contained]: [-1,0,1]
        },
        Bdate:{
          [Op.and]:{
            [Op.gte]: req.body.byear1,
            [Op.lte]: req.body.byear2
          }
        },
        Role:{
          [Op.contains]: req.body.role
        }
      }
    }*/
  })
    .then(member =>{
      var list = [];
      var i = 0;
      while(i < member.length){
        var bool = true;
        if(req.body.id != ''){
          if(member[i].Id.indexOf(req.body.id) === -1){
            bool = false;
          }
        }
        if(gender_to != -1){
          if(member[i].Gender != gender_to){
            bool = false;
          }
        }
        if(req.body.byear1 != ''){
          var bye = req.body.byear2
          if(req.body.byear2 === ''){
            bye = '9999'
          }
          if(member[i].Bdate.substr(0,4)< req.body.byear1 || member[i].Bdate.substr(0,4) > bye){
            bool = false;
          }
        }
        if(member[i].Role.indexOf(req.body.role) === -1){
          bool = false;
        }
        if(bool){
          list.push(member[i]);
        }
      }
      res.send({ 
        users :list
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