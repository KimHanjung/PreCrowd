module.exports = (sequelize, Sequelize) => {
    const Handin = sequelize.define("HAND_IN", {
      H_id: {
        type: Sequelize.STRING,
        primaryKey: true,
        onDelete: 'CASCADE',
      },
      File_index: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        onDelete: 'CASCADE',
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