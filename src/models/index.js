const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: 0,
    port: config.port,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.member = require("./member.model.js")(sequelize, Sequelize);
db.approval = require("./approval.model.js")(sequelize, Sequelize);
db.task = require("./task.model.js")(sequelize, Sequelize);
db.parsing = require("./parsing_data_file.model.js")(sequelize, Sequelize);
db.origin = require("./original_data_file.model.js")(sequelize, Sequelize);
db.handin = require("./hand_in.model.js")(sequelize, Sequelize);

db.approval.belongsTo(db.member, {
  foreignKey: 'H_id', 
});
db.approval.belongsTo(db.task, {
  foreignKey: 'Task_name', 
});

db.parsing.belongsTo(db.member, {
  foreignKey: 'E_id', 
});
db.parsing.belongsTo(db.origin, {
  foreignKey: 'Type_id', 
});

db.origin.belongsTo(db.task, {
  foreignKey: 'Task_name', 
});

db.handin.belongsTo(db.member, {
  foreignKey: 'H_id', 
});
db.handin.belongsTo(db.parsing, {
  foreignKey: 'File_index', 
});


module.exports = db;