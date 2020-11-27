const express = require("express");
const bodyParser = require("body-parser");
var bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./src/models");
const Member = db.member;


require('./src/routes/auth.routes')(app);
require('./src/routes/user.routes')(app);

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Precrowd." });
});

// set port, listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial(){
  Member.create({
    Name: '관리자',
    Id: 'admin',
    Pw: bcrypt.hashSync('admin', 8),
    Role: 'Administrator'
  })
  .then((res) => console.log('Administrator is created!')
  )
  .catch((err) => console.log('Administrator creates error: ', err));
}