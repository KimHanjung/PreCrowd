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
require('./src/routes/submit.routes')(app);

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
    Name: 'admin',
    Id: 'admin',
    Pw: bcrypt.hashSync('admin', 8),
    Role: 'Administrator'
  })
  .then((res) => console.log('Administrator is created!'))
  .catch((err) => console.log('Administrator creates error!'));
}
// const Task = db.task;
// const Handin = db.handin;
// const Parsing = db.parsing;
// const Origin = db.origin;
// const Approval = db.approval;

// function initial(){
//   Member.bulkCreate([{
//     Name: '관리자',
//     Id: 'admin',
//     Pw: bcrypt.hashSync('admin', 8),
//     Role: 'Administrator'
//   },
//   {
//     Name: '김한중',
//     Id: 'Kim',
//     Pw: bcrypt.hashSync('admin', 8),
//     Role: 'Submittor'
//   },
//   {
//     Name: '신지헌',
//     Id: 'Shin',
//     Pw: bcrypt.hashSync('admin', 8),
//     Role: 'Evaluationer'
//   },
//   {
//     Name: '추교빈',
//     Id: 'Chu',
//     Pw: bcrypt.hashSync('admin', 8),
//     Role: 'Evaluationer'
//   },
//   {
//     Name: '권동현',
//     Id: 'Kwon',
//     Pw: bcrypt.hashSync('admin', 8),
//     Role: 'Submittor'
//   },
//   {
//     Name: '이창열',
//     Id: 'Lee',
//     Pw: bcrypt.hashSync('admin', 8),
//     Role: 'Submittor'
//   }])
//   .then((res) => {console.log('Administrator is created!');
//   initial2();
//   initial3();
// }
//   )
//   .catch((err) => console.log('Administrator creates error: ', err));
// }

// function initial2(){
//   Task.create({
//     Task_name: '보험 로그 수집',
//     Desc: '보험들의 로그를 수집함',
//     Term: 5,
//     Task_data_table_name: 'Card_log',
//     Task_data_table_schema: '회원, 카드번호, 유효기간',
//   });
//   Task.create({
//     Task_name: '카드 로그 수집',
//     Desc: '카드들의 로그를 수집함',
//     Term: 5,
//     Task_data_table_name: 'Card_log',
//     Task_data_table_schema: '회원, 카드번호, 유효기간',
//   })
//   .then((res) => console.log('Task is created!')
//   )
//   .catch((err) => console.log('Task creates error: ', err));

//   Approval.create({
//     H_id: 'Kim',
//     Task_name: '카드 로그 수집',
//     Status: 0,
//   })
//   Approval.create({
//     H_id: 'Kim',
//     Task_name: '보험 로그 수집',
//     Status: 1,
//   })
//   Approval.create({
//     H_id: 'Lee',
//     Task_name: '카드 로그 수집',
//     Status: 1,
//   })
//   Approval.create({
//     H_id: 'Kwon',
//     Task_name: '카드 로그 수집',
//     Status: 1,
//   })
//   Approval.create({
//     H_id: 'Chu',
//     Task_name: '보험 로그 수집',
//     Status: 0,
//   })
//   .then((res) => console.log('Approval is created!')
//   )
//   .catch((err) => console.log('Approval creates error: ', err));
// }

// function initial3(){
//   Origin.create({
//     Schema: "이름, 카드사, 번호",
//     Task_name: '카드 로그 수집',
//     Type_name: '신한카드',
//   })
//   Origin.create({
//     Schema: "이름, 카드사, 번호",
//     Task_name: '카드 로그 수집',
//     Type_name: '국민카드',
//   })
//   Origin.create({
//     Schema: "이름, 카드사, 번호",
//     Task_name: '보험 로그 수집',
//     Type_name: '우리카드',
//   })
//   .then((res) => console.log('Origin is created!')
//   )
//   .catch((err) => console.log('Origin creates error: ', err));

//   Parsing.create({
//     Parsing_file_name: "신한",
//     Pass: 0,
//     E_id: 'Kim',
//     Type_id: 1,
//   });

//   Parsing.create({
//     Parsing_file_name: "우리",
//     Pass: 1,
//     E_id: 'Lee',
//     Type_id: 1,
//   })

//   Parsing.create({
//     Parsing_file_name: "국민",
//     Pass: 1,
//     E_id: 'Kim',
//     Type_id: 2,
//   })
//   .then((res) => {console.log('Parsing is created!');initial4();}
//   )
//   .catch((err) => console.log('Parsing creates error: ', err));
// }

// function initial4(){
//   Handin.create({
//     H_id: "Kim",
//     File_index: 1,
//   })
//   .then((res) => {console.log('Handin is created!');
// })}