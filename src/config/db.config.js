module.exports = {
    HOST: "localhost",
    USER: "team4",
    PASSWORD: "171983",
    DB: "team4",
    dialect: "mariadb",
    port:3021,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };