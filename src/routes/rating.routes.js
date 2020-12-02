const controller = require("../controllers/rating.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.get(
        "/src/api/todolist",
        controller.todolist
    );

    app.get(
        "/src/api/download",
        controller.download
    );

    app.get(
        "/src/api/pass",
        controller.pass
    )
}