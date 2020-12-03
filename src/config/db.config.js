module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "kbkj.1",
    DB: "db_project",
    dialect: "mariadb",
    port:3307,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };