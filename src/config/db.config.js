module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "root",
    DB: "test5",
    dialect: "mariadb",
    port:3305,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };