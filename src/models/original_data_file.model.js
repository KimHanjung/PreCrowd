module.exports = (sequelize, Sequelize) => {
    const Original = sequelize.define("ORIGINAL_DATA_FILE", {
      Type_id: {
        type: Sequelize.INTEGER,
        autoincrement: true,
        primaryKey: true
      },
      Schema: {
        type: Sequelize.STRING
      },
      Schema_mapping_info: {
        type: Sequelize.STRING,
      },
      Task_name: {
        type: Sequelize.STRING,
      },
    },{timestamps: false,});
  
    return Original;
  };