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
  app.get("/src/user/getfile", controller.getfile);

  app.post("/src/user/create_task", controller.create_task);
  
  app.post("/src/user/create_original", controller.create_original);

  app.post("/src/user/get_task", controller.get_task);

  app.post("/src/user/get_approval", controller.get_approval);

  app.post("/src/user/modify_approval", controller.modify_approval);

  app.post("/src/user/delete_task", controller.delete_task);

  app.post("/src/user/set_pass", controller.set_pass);

  app.post("/src/user/task_stat", controller.task_stat);

  app.post("/src/user/task_member", controller.task_member);
  console.log('hi@!#!@#!@#!@#!@#!@#!@#@@#!!@#@!#@!#!@#!@#');
};