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
const Task = db.task;;
const Approval = db.approval;
const Handin = db.handin;
const Original = db.origin;
const Parsing = db.parsing;

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

const PORT = process.env.PORT || 3001;
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

  Member.create({
    Name: 'Submittor1',
    Id: 'Submittor1',
    Pw: bcrypt.hashSync('11111', 8),
    Role: 'Submittor',
    Bdate: '34-11-11',
    Gender: 1,
    Phone:'010-1111-1111',
    Address: 'busan',
    Score: 70
  })
  .then((res) => console.log('Submittor1 is created!')
  )
  .catch((err) => console.log('Submittor1 creates error: ', err));

  Member.create({
    Name: 'Evaluationer1',
    Id: 'Evaluationer1',
    Pw: bcrypt.hashSync('11111', 8),
    Role: 'Evaluationer',
    Bdate: '65-12-12',
    Gender: 0,
    Phone:'010-2222-2222',
    Address: 'seoul',
  })
  .then((res) => console.log('Evaluationer1 is created!')
  )
  .catch((err) => console.log('Evaluationer1 creates error: ', err));

  Task.create({
    Task_name: 'Task1',
    Desc: 'blablablablablablabla',
    Term: 30,
    Task_data_table_name: 'task1_table',
    Task_data_table_schema: 'col1,col2,col3'
  })
  .then((res) => console.log('Task1 is created!')
  )
  .catch((err) => console.log('Task1 creates error: ', err));

  Task.create({
    Task_name: 'Task2',
    Desc: 'blablablablablablabla',
    Term: 30,
    Task_data_table_name: 'task2_table',
    Task_data_table_schema: 'col1,col2,col3'
  })
  .then((res) => console.log('Task2 is created!')
  )
  .catch((err) => console.log('Task2 creates error: ', err));

  Original.create({
    Schema: 'col1,col2,col3',
    Type_name: 'ori1',
    Task_name: 'Task1'
  })
  .then((res) => console.log('Original data1 is created!')
  )
  .catch((err) => console.log('Original data1 creates error: ', err));

  Parsing.create({
    Parsing_file_name: 'parsing file 1',
    Pass: false,
    User_score: 70,
    E_id: 'Submittor1',
    System_score: 60,
    Type_id: 1,
    Data_file: 'data1,data2,data3'
  })
  .then((res) => console.log('parsing file 1 is created!')
  )
  .catch((err) => console.log('parsing file 1 creates error: ', err));
  
  Approval.create({
    H_id: 'Submittor1',
    Task_name: 'Task1',
    Status: false
  })
  .then((res) => console.log('Approval 1 is created!')
  )
  .catch((err) => console.log('Approval 1 creates error: ', err));
  
  // Approval.create({
  //   H_id: 'Submittor2',
  //   Task_name: 'Task2',
  //   Status: false
  // })
  // .then((res) => console.log('Approval 2 is created!')
  // )
  // .catch((err) => console.log('Approval 2 creates error: ', err));
}