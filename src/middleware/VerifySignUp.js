const db = require("../models");
const Member = db.member;

checkDuplicateId = (req, res, next) => {
  // Username
  Member.findOne({
    where: {
      Id: req.body.id
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Id is already in use!"
      });
      return;
    }
    next();
  });
};

const verifySignUp = {
  checkDuplicateId: checkDuplicateId,
};

module.exports = verifySignUp;