module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("MEMBER", {
      Id: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      Pw: {
        type: Sequelize.STRING
      },
      Name: {
        type: Sequelize.STRING,
      },
      Bdate: {
        type: Sequelize.DATE,
      },
      Gender: {
        type: Sequelize.BOOLEAN,
      },
      Phone: {
        type: Sequelize.STRING,
      },
      Address: {
        type: Sequelize.STRING,
      },
      Role: {
        type: Sequelize.STRING,
      },
    });
  
    return Role;
  };