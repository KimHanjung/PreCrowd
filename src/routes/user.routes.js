const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/src/user/task_stat", controller.task_stat);

  app.post("/src/user/task_member", controller.task_member);
  console.log('hi@!#!@#!@#!@#!@#!@#!@#@@#!!@#@!#@!#!@#!@#');
};