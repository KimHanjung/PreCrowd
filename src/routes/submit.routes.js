const { verifySignUp } = require("../middleware");
const controller = require("../controllers/submit.controller");

var multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, 'src/uploads')
  },
  filename: function(req, file, cb){
    console.log(file);
    cb(null, file.originalname)
  }
})

var upload = multer({storage:storage});

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
      "/src/api/tasklist",
      controller.tasklist
  );
  
  app.post(
      "/src/api/taskreq",
      controller.taskreq
  );

  app.get(
    "/src/api/submit/score",
    controller.submitscore
  );
  
  app.get(
    "/src/api/submit/taskstate",
    controller.submittaskstate
  );

  app.get(
    "/src/api/typestate",
    controller.submittypestate
  );

  app.get(
    "/src/api/taskin",
    controller.taskin
  );

  app.get(
    "/src/api/typelist",
    controller.typelist
  );

  app.post(
    "/src/api/submit", 
    upload.single('userfile'),
    controller.submit
  );
  
};