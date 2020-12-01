module.exports = (sequelize, Sequelize) => {
    const Approval = sequelize.define("APPROVAL", {
      H_id: {
        type: Sequelize.STRING,
        primaryKey: true,
        onDelete: 'CASCADE',
      },
      Task_name: {
        type: Sequelize.STRING,
        primaryKey: true,
        onDelete: 'CASCADE'
      },
      Status: {
        type: Sequelize.BOOLEAN,
      },
    });
  
    return Approval;
  };