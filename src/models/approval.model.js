module.exports = (sequelize, Sequelize) => {
    const Approval = sequelize.define("APPROVAL", {
      H_id: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      Task_name: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      Status: {
        type: Sequelize.BOOLEAN,
      },
    },{
      timestamps: false,
      charset: 'utf8',
      collate: 'utf8_unicode_ci',
    });
  
    return Approval;
  };