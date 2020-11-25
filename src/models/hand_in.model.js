module.exports = (sequelize, Sequelize) => {
    const Handin = sequelize.define("HAND_IN", {
      H_id: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      File_index: {
        type: Sequelize.INTEGER
      },
      Round: {
        type: Sequelize.INTEGER,
      },
      Period: {
        type: Sequelize.STRING,
      },
    });
  
    return Handin;
  };