module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("TASK", {
      Task_name: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      Desc: {
        type: Sequelize.STRING
      },
      Pass: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
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
    },{
      timestamps: false,
      charset: 'utf8',
      collate: 'utf8_unicode_ci',
    });
  
    return Task;
  };