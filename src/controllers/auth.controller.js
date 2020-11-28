const db = require("../models");
const config = require("../config/auth.config");
const Member = db.member;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { member } = require("../models");

exports.signup = (req, res) => {
  // Save User to Database
  Member.create({
    Name: req.body.username,
    Id: req.body.id,
    Pw: bcrypt.hashSync(req.body.password, 8),
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
exports.signout = (req, res) =>{
  Member.destroy({
    Id: req.body.id}
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
        accessToken: token
      });
    })
