module.exports = (sequelize, Sequelize) => {
    const Original = sequelize.define("ORIGINAL_DATA_FILE", {
      Type_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      Schema: {
        type: Sequelize.STRING
      },
      Type_name: {
        type: Sequelize.STRING,
      },
      Task_name: {
        type: Sequelize.STRING,
      },
    },{
      timestamps: false,
      charset: 'utf8',
      collate: 'utf8_unicode_ci',
    });
  
    return Original;
  };