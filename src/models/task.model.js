module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("TASK", {
      Task_name: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      Desc: {
        type: Sequelize.STRING
      },
      Term: {
        type: Sequelize.INTEGER,
      },
      Task_data_table_name: {
        type: Sequelize.STRING,
      },
      Task_data_table_schema: {
        type: Sequelize.STRING,
      },
    },{timestamps: false,});
  
    return Task;
  };