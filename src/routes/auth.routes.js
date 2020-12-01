const { verifySignUp, authJwt } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/src/auth/signup",
    [
      verifySignUp.checkDuplicateId,
    ],
    controller.signup
  );

  app.post("/src/auth/signin", controller.signin);

  app.post(
    "/src/auth/management",
     controller.management
     );

  app.post(
    "/src/auth/withdrawal", 
    [
      authJwt.verifyToken,
    ],
    controller.withdrawal
  );

  app.post(
    "/src/auth/update", 
    [
      authJwt.verifyToken,
    ],
    controller.update
  );

  app.post(
    "/src/auth/password", 
    [
      authJwt.verifyToken,
    ],
    controller.password
  );
};