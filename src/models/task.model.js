module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("TASK", {
      Task_name: {
        type: Sequelize.STRING,
        primaryKey: true,
        onDelete: 'CASCADE'
      },
      Desc: {
        type: Sequelize.STRING,
      },
      Pass: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      Term: {
        type: Sequelize.INTEGER,
      },
      Pass: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      Task_data_table_name: {
        type: Sequelize.STRING,
        unique: true,
      },
      Task_data_table_schema: {
        type: Sequelize.STRING,
      },
      Status: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
    },{
      timestamps: false,
      charset: 'utf8',
      collate: 'utf8_unicode_ci',
    });
  
    return Task;
  };