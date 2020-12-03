module.exports = (sequelize, Sequelize) => {
    const Parsing = sequelize.define("PARSING_DATA_FILE", {
      File_index: {
        type: Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey: true
      },
      Parsing_file_name: {
        type: Sequelize.STRING,
      },
      Pass: {
        type: Sequelize.BOOLEAN,
      },
      User_score: {
        type: Sequelize.INTEGER,
      },
      E_id: {
        type: Sequelize.STRING,
        onDelete: 'CASCADE',
      },
      Total_tuple_num: {
        type: Sequelize.INTEGER,
      },
      overlap_tuple: {
        type: Sequelize.INTEGER,
      },
      null_percent : {
        type: Sequelize.STRING,
      },
      Type_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
      },
      Data_file: {
        type: Sequelize.BLOB('long'),
      },
    },{
      timestamps: false,
      charset: 'utf8',
      collate: 'utf8_unicode_ci',
    });
  
    return Parsing;
  };