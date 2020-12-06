module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "moon0775",
    DB: "test5",
    dialect: "mariadb",
    port:3306,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };