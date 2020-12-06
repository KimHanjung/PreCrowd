module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "database0203",
    DB: "project",
    dialect: "mariadb",
    port:3306,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };